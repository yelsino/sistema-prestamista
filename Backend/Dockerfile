FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/API-TS

COPY package*.json ./

COPY config/* /usr/src/API-TS/config/

COPY src ./src

RUN npm install

ENV NODE_ENV=production

EXPOSE 8080

CMD [ "npm", "start" ]
