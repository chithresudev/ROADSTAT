# Use Node image as the base
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY react-app/package*.json ./
RUN npm install

# Copy the rest of the application files
COPY react-app/ .

# Build the application
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
