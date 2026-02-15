# Use Node.js 18-alpine as base image
FROM node:18-alpine AS base

# Install pnpm and prisma
RUN npm install -g pnpm prisma

# --- STAGE 1: Dependencies ---
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# --- STAGE 2: Build ---
FROM base AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules

# Copy source
COPY . .

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN npx prisma generate

# Build the app
RUN pnpm build

# --- STAGE 3: Production ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

# Expose port
EXPOSE 3001

# Start the application
WORKDIR /app/apps/backend
CMD ["npm", "run", "start:prod"]
