FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /app

RUN npm -g install nodemon

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY . /app
