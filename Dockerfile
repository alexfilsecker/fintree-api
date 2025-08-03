FROM node:lts as build

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Create the final Image
FROM node:lts

WORKDIR /app

# Copy the generated Prisma client and application files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma-gen ./prisma-gen

# Get the Database URL from environment variables
COPY .envs/.local/.api.env .env

# Copy application files
COPY package.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
COPY src ./src
