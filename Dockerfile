# Use a Node.js image to build the frontend
FROM node:18 AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install && ls -l node_modules/.bin
# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Use a minimal Nginx image to serve the frontend
FROM nginx:alpine

# Copy built files to Nginx's web server directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
