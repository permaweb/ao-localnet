FROM node:alpine as builder
ARG MU_VERSION=main

RUN apk add git

WORKDIR /download
RUN git clone --branch=${MU_VERSION} --depth=1 https://github.com/permaweb/ao.git
WORKDIR /download/ao/servers/mu


FROM node:alpine
COPY --from=builder /download/ao/servers/mu /usr/app
WORKDIR /usr/app

RUN sed -i '/postinstall/d' package.json
RUN sed -i '/heapdump/d' package.json
RUN sed -i '/heapdump/d' src/app.js

RUN npm install --ignore-engines --omit=dev

EXPOSE 80
CMD ["npm", "start"]
