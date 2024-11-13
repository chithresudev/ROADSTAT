# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json for frontend dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend source code
COPY / .

# Build the frontend application for production
RUN CI=false npm run build

# Expose the port the frontend app will run on (adjust if needed)
EXPOSE 3000

# Command to run the frontend app
CMD ["npx", "vite", "preview", "--host"]
