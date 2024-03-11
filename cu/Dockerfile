FROM node:alpine as builder
ARG CU_VERSION=main

RUN apk add git

WORKDIR /download
RUN git clone --branch=${CU_VERSION} --depth=1 https://github.com/permaweb/ao.git

FROM node:alpine
COPY --from=builder /download/ao/servers/cu /usr/app
WORKDIR /usr/app

RUN sed -i '/heapdump/d' package.json
RUN sed -i '/heapdump/d' src/app.js

RUN npm install --ignore-engines --omit=dev

EXPOSE 80
CMD ["npm", "start"]
