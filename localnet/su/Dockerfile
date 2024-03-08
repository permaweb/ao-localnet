FROM node:alpine as downloader
ARG MU_VERSION=main

RUN apk add git

WORKDIR /download
RUN git clone --branch=${MU_VERSION} --depth=1 https://github.com/permaweb/ao.git

FROM clux/muslrust:1.75.0 as builder
COPY --from=downloader /download/ao/servers/su /usr/src
WORKDIR /usr/src

RUN cargo build --release --target x86_64-unknown-linux-musl

FROM alpine:latest
COPY --from=builder /usr/src/target/x86_64-unknown-linux-musl/release/su /usr/app/su
WORKDIR /usr/app

EXPOSE 80
CMD ["./su", "su", "80"]
