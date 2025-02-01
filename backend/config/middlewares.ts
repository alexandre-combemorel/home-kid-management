module.exports = ({ env }) => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            `https://${env("SCALEWAY_BUCKET")}.s3.${env("SCALEWAY_REGION")}.scw.cloud`,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            `https://${env("SCALEWAY_BUCKET")}.s3.${env("SCALEWAY_REGION")}.scw.cloud`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
]
