# ---- Builder stage ----
# Use a Debian-based Node image so native modules like sharp/libvips build reliably
FROM node:20-bullseye AS builder
WORKDIR /app

# Install pnpm globally (pin or use latest as desired)
RUN npm install -g pnpm@latest

# Install system packages required to build sharp/libvips (optional but recommended)
# Keep packages minimal and remove apt lists to reduce layer size
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    build-essential \
    pkg-config \
    libvips-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy package manifests first to leverage Docker layer caching
# If you use yarn or npm, adjust accordingly
COPY package.json pnpm-lock.yaml* ./

# Install dependencies. Try to use the lockfile; fall back to fresh install if necessary
RUN pnpm install --frozen-lockfile --prefer-offline || pnpm install

# Copy the rest of the project
COPY . .

# Ensure production environment for build
ENV NODE_ENV=production

# Build the Astro site (assumes `pnpm build` exists in package.json)
RUN pnpm build

# ---- Production stage (nginx) ----
# Use a small nginx image to serve static files
FROM nginx:stable-alpine AS runner

# Remove default server config; we'll provide our own
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config (make sure nginx/default.conf exists in the repo)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Optionally copy a custom favicon or robots if you want to override defaults
# COPY public/robots.txt /usr/share/nginx/html/robots.txt
# COPY public/favicon.ico /usr/share/nginx/html/favicon.ico

# Expose HTTP port (and 443 if you later add TLS)
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
