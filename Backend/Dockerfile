# Use Node.js as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY Backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY Backend/ .

# Expose the port the app will run on
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "start"]
