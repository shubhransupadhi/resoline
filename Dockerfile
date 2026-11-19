# ==========================================================
# Resoline Techbis Production Multi-Stage Dockerfile
# Base: Nginx Alpine (Lightweight, Non-Root, Zero CVE)
# ==========================================================

# Stage 1: Build / Asset Preparation Stage
FROM alpine:3.20 AS builder
WORKDIR /app
COPY . .
# Remove test scripts and documentation from container build
RUN rm -rf scratch docs tests .git .github *.ps1

# Stage 2: Production Nginx Runtime Stage
FROM nginx:1.27-alpine AS runner

# Create app directory and set ownership
WORKDIR /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy cleaned web assets from builder
COPY --from=builder /app /usr/share/nginx/html

# Set non-root permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx

# Switch to non-root user for hardened security
USER nginx

# Container Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/api/health || exit 1

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
