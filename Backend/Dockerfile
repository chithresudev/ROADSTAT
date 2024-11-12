# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json for backend dependencies
COPY Backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code
COPY Backend/ .

# Expose the port the backend app will run on (adjust if needed)
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "run", "server"]
