# 1. Use Node 20 as the base (Medusa V2 requirement)
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your backend code
COPY . .

# 5. Build the Medusa project
RUN npm run build

# 6. Hugging Face Spaces MUST use port 7860
ENV PORT=7860
EXPOSE 7860

# 7. Start command: Run migrations then start the server
ENV KNEX_ACQUIRE_CONNECTION_TIMEOUT=60000
# We bind to 0.0.0.0 so Hugging Face can "see" the app
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start --host 0.0.0.0 --port 7860"]