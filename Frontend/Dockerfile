# Use the official Node.js image to build the React app
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY Frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY Frontend/ ./

# Build the React app for production
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine

# Copy the build folder from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
