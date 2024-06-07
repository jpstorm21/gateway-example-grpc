FROM node:21-alpine3.19

RUN apk update && apk add --no-cache git protobuf

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./


RUN npm install
RUN npm run proto:all

COPY . .

EXPOSE 8000