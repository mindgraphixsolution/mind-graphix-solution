# Use Node.js 18-alpine as base image
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# --- STAGE 1: Dependencies ---
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# --- STAGE 2: Build ---
FROM base AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules

# Copy source
COPY . .

# Build the app
WORKDIR /app/apps/frontend
RUN pnpm build

# --- STAGE 3: Production ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/apps/frontend/next.config.js ./apps/frontend/
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json

# Expose port
EXPOSE 3000

# Start the application
WORKDIR /app/apps/frontend
CMD ["npm", "run", "start"]
