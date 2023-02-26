FROM node:18-alpine

ARG BUILD_CONTEXT

WORKDIR /usr/src/app

COPY package*.json .
COPY ./apps/*/package.json .
COPY ./packages/*/package.json .
COPY ./backend/package.json .
COPY ./frontend/package.json .

RUN npm i

COPY . .

WORKDIR /usr/src/app/$BUILD_CONTEXT

RUN npm i

USER node

EXPOSE 8000

CMD ["sleep", "infinity"]