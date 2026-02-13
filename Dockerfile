# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
# install all deps (dev + prod) for build
RUN npm ci --silent || npm install --silent
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
