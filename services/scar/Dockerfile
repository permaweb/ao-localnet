################################################################################
# Download

FROM node:alpine as downloader
WORKDIR /download

RUN apk add git

ARG REPO
ARG BRANCH
RUN git clone --branch=${BRANCH} --depth=1 ${REPO} .

################################################################################
# Build

FROM node:alpine as builder
WORKDIR /build
COPY --from=downloader /download .

RUN yarn install
ARG ARWEAVE_GATEWAY_URL
ENV VITE_ARWEAVE_GATEWAY_URL=${ARWEAVE_GATEWAY_URL}
RUN yarn run build --mode development

################################################################################
# Run

FROM httpd:alpine
COPY --from=builder /build/dist /usr/local/apache2/htdocs
