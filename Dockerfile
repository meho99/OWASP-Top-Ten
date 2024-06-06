FROM node:18.16-buster

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && apt-get clean

RUN npm install -g jq.node