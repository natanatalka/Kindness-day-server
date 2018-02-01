FROM node:carbon


WORKDIR /usr/src/app



RUN npm install

COPY ../ .

