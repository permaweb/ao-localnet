FROM node:alpine as downloader
ARG SU_VERSION=main

RUN apk add git

WORKDIR /download
RUN git clone --branch=${SU_VERSION} --depth=1 https://github.com/permaweb/ao.git

FROM rust AS builder
WORKDIR /build
COPY --from=downloader /download/ao/servers/su .

RUN cargo build --release

FROM rust:slim
WORKDIR /app
COPY --from=builder /build/target/release/su .

RUN apt update && apt install --yes libpq5

EXPOSE 80
CMD ["./su", "su", "80"]
