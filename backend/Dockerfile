FROM node:20.18.1-alpine3.21
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
RUN npm install -g pnpm
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PNPM_HOME="/home/node/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /opt/app
RUN pnpm add --global node-gyp
COPY . .
RUN pnpm install --force
RUN chown -R node:node /opt/app
USER node
RUN pnpm build
EXPOSE 1337
CMD ["pnpm", "start"]