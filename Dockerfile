# --- Stage 1: Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install deps
RUN npm install

# Copy entire project
COPY . .

# Build project
RUN npm run build


# --- Stage 2: Run Stage ---
FROM node:18-alpine

WORKDIR /app

# Copy only the build output + node_modules
COPY --from=builder /app ./

# Expose Next.js port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
