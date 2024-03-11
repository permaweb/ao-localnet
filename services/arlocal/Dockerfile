FROM node:alpine

RUN apk add git
RUN npm install --global arlocal@1.1.65

WORKDIR /mnt

EXPOSE 80
CMD ["npx", "arlocal", "--persist", "--dbpath", ".", "80"]
