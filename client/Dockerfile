FROM node:18-alpine As development

WORKDIR /app/client

COPY package*.json pnpm-lock.yaml* ./

RUN yarn global add pnpm && pnpm i

COPY . .