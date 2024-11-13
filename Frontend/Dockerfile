# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json for frontend dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend source code
COPY . .

# Build the frontend application for production
RUN CI=false npm run build

# Install a static file server to serve the build
RUN npm install -g serve

# Expose the port the frontend app will run on (adjust if needed)
EXPOSE 3000

# Command to serve the production build
CMD ["serve", "-s", "dist", "-l", "3000"]
