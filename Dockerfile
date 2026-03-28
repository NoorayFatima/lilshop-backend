# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies for the build
RUN npm install
COPY . .
# Build the server ONLY (skips the heavy Admin UI build)
RUN npx medusa build --server-only

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Only copy what we need to RUN the app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/medusa-config.ts ./medusa-config.ts

# Setup uploads folder
RUN mkdir -p uploads && chmod -R 777 uploads

# Set Environment Variables
ENV PORT=7860
ENV NODE_ENV=production
ENV DB_QUERY_TIMEOUT=90000

EXPOSE 7860

# Start directly without migrations to save time/RAM
CMD ["npx", "medusa", "start", "--host", "0.0.0.0", "--port", "7860"]