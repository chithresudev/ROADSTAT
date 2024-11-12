# Stage 1: Build the React application
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app files
COPY . .

# Build the React app for production
RUN CI=false npm run build

# Debug: List the contents to check if the build folder is created
RUN echo "Build contents:" && ls -la /app/build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build folder from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
