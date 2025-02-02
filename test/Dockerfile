FROM node:20.18.1-alpine3.21
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app
COPY . .
CMD ["node", "index.js"]