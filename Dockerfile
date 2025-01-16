FROM node:20-bookworm-slim AS builder

COPY . /app
WORKDIR /app

ENV time_zone=Asia/Seoul

RUN apt-get update -y && apt-get install -y openssl python3
RUN corepack enable
RUN corepack prepare yarn --activate
RUN yarn install --frozen-lockfile

RUN yarn run build

CMD ["yarn", "run", "start"]