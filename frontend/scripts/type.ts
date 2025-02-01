export interface UploadConfig {
  bucket: string
  region: string
  endpoint: string
  chunkSize: number // in bytes, minimum 5MB
  concurrentUploads: number
  includeFiles?: string[] // File extensions or names to include
  excludeFiles?: string[] // File extensions or names to exclude
}

export interface FileInfo {
  path: string
  relativePath: string
}

export interface ErrorType {
  name: string
  $fault: string
  $metadata: {
    httpStatusCode: number
    requestId: string
    extendedRequestId: string
    attempts: number
    totalRetryDelay: number
  }
  Code: string
  RequestId: string
  HostId: string
  Resource: string
  message: string
}
