import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3"
import { createReadStream, readdir, stat } from "node:fs"
import { promisify } from "node:util"
import { join, relative } from "node:path"
import type { ErrorType, FileInfo, UploadConfig } from "./type"

const SCW_ACCESS_KEY = process.env.SCW_ACCESS_KEY ?? ""
const SCW_SECRET_KEY = process.env.SCW_SECRET_KEY ?? ""
const DIST_FOLDER_TO_DEPLOY = process.env.DIST_FOLDER_TO_DEPLOY ?? ""
const SCW_BUCKET_NAME = process.env.SCW_BUCKET_NAME ?? ""
const SCW_END_POINT = process.env.SCW_END_POINT ?? ""
const SCW_REGION = process.env.SCW_REGION ?? ""

const readdirAsync = promisify(readdir)
const statAsync = promisify(stat)

class S3MultipartUploader {
  private s3Client: S3Client
  private config: UploadConfig
  private uploadQueue: FileInfo[] = []
  private baseFolder = ""

  constructor(config: UploadConfig) {
    this.config = config
    this.s3Client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: SCW_ACCESS_KEY,
        secretAccessKey: SCW_SECRET_KEY,
      },
    })
  }

  private shouldIncludeFile(filename: string): boolean {
    if (this.config.includeFiles?.length) {
      return this.config.includeFiles.includes(filename)
    }

    if (this.config.excludeFiles?.length) {
      return !this.config.excludeFiles.includes(filename)
    }

    return true
  }

  private async scanFolder(folderPath: string): Promise<void> {
    const items = await readdirAsync(folderPath)

    for (const item of items) {
      const fullPath = join(folderPath, item)
      const stats = await statAsync(fullPath)

      if (stats.isDirectory()) {
        await this.scanFolder(fullPath)
      } else if (this.shouldIncludeFile(item)) {
        this.uploadQueue.push({
          path: fullPath,
          relativePath: relative(this.baseFolder, fullPath),
        })
      } else {
        console.log(`Skipping ${item}`)
      }
    }
  }

  async uploadFolder(folderPath: string): Promise<void> {
    try {
      this.baseFolder = folderPath
      await this.scanFolder(folderPath)
      console.log(`Found ${this.uploadQueue.length} files in folder and subfolders`)

      for (let i = 0; i < this.uploadQueue.length; i += this.config.concurrentUploads) {
        const chunk = this.uploadQueue.slice(i, i + this.config.concurrentUploads)
        const promises = chunk.map((file) => this.uploadFile(file))
        await Promise.all(promises)
      }

      console.log("All files uploaded successfully")
      this.uploadQueue = []
    } catch {
      console.error("Error uploading folder:", folderPath)
      return
    }
  }

  private async uploadFile(fileInfo: FileInfo): Promise<void> {
    const { path: filePath, relativePath } = fileInfo
    const fileStats = await statAsync(filePath)
    const fileSize = fileStats.size

    console.log(`Starting upload for ${relativePath} (${fileSize} bytes)`)

    try {
      const createResponse = await this.s3Client.send(
        new CreateMultipartUploadCommand({
          Bucket: this.config.bucket,
          Key: relativePath.replace(/\\/g, "/"), // Ensure forward slashes for S3 keys
        }),
      )

      const uploadId = createResponse.UploadId ?? ""
      const parts: { PartNumber: number; ETag: string }[] = []
      const numParts = Math.ceil(fileSize / this.config.chunkSize)

      for (let partNumber = 1; partNumber <= numParts; partNumber++) {
        const start = (partNumber - 1) * this.config.chunkSize
        const end = Math.min(start + this.config.chunkSize, fileSize)

        const uploadPartResponse = await this.s3Client.send(
          new UploadPartCommand({
            Bucket: this.config.bucket,
            Key: relativePath.replace(/\\/g, "/"),
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: createReadStream(filePath, { start, end: end - 1 }),
          }),
        )

        parts.push({
          PartNumber: partNumber,
          ETag: uploadPartResponse.ETag ?? "",
        })

        console.log(`Uploaded part ${partNumber}/${numParts} for ${relativePath}`)
      }

      await this.s3Client.send(
        new CompleteMultipartUploadCommand({
          Bucket: this.config.bucket,
          Key: relativePath.replace(/\\/g, "/"),
          UploadId: uploadId,
          MultipartUpload: { Parts: parts },
        }),
      )

      console.log(`Successfully uploaded ${relativePath}`)
    } catch (error) {
      const errorDetails = error as ErrorType
      console.error(`Error uploading ${relativePath}:`, errorDetails.Code, errorDetails.message)
      throw ""
    }
  }
}

// Example usage
async function main() {
  const config: UploadConfig = {
    bucket: SCW_BUCKET_NAME,
    endpoint: SCW_END_POINT,
    region: SCW_REGION,
    chunkSize: 5 * 1024 * 1024, // 5MB minimum
    concurrentUploads: 3,
    excludeFiles: [".DS_Store"],
  }

  const uploader = new S3MultipartUploader(config)

  try {
    await uploader.uploadFolder(DIST_FOLDER_TO_DEPLOY)
  } catch {
    console.error("Upload failed")
  }
}

main()
