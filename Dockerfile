FROM node:lts

WORKDIR /app

COPY package.json ./
RUN npm install

COPY prisma ./prisma
COPY .env /app/.env

RUN npx prisma generate

COPY src ./src

