FROM node:20.18.1-alpine3.21 AS builder

ENV TZ=Asia/Seoul
RUN apk add --no-cache bash openssl tzdata libc6-compat \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && corepack prepare yarn --activate
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:20.18.1-alpine3.21 AS final

ENV TZ=Asia/Seoul \
        NODE_ENV=production
RUN apk add --no-cache tzdata curl \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && addgroup -g 1001 app \
    && adduser -u 1001 -G app -s /bin/sh -D app

WORKDIR /app
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist

USER app

CMD ["node", "dist/index.js"]