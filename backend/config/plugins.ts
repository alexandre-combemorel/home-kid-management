export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        credentials: {
          accessKeyId: env("SCALEWAY_ACCESS_KEY_ID"),
          secretAccessKey: env("SCALEWAY_ACCESS_SECRET"),
        },
        region: env("SCALEWAY_REGION"),
        endpoint: env("SCALEWAY_ENDPOINT"),
        params: {
          Bucket: env("SCALEWAY_BUCKET"),
        },
      },
    },
  },
})
