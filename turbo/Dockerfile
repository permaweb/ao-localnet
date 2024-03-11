FROM node:alpine as downloader
ARG TURBO_VERSION=main

RUN apk add git

WORKDIR /download
RUN git clone --branch=${TURBO_VERSION} --depth=1 https://github.com/ardriveapp/turbo-upload-service.git

FROM node:alpine as builder
COPY --from=downloader /download/turbo-upload-service /usr/src
WORKDIR /usr/src

RUN sed -i 's/..\/..\/src\/arch/..\/arch/' src/migrations/20231106203141_nullable_content_type.ts

RUN yarn
RUN yarn build

EXPOSE 80
CMD ["node", "start.mjs"]
