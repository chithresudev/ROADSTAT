# Use the Node.js image as the base
FROM node:22.9.0

# Set the working directory inside the container
WORKDIR /app

# Copy and install dependencies for the backend
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm install

# Copy and install dependencies for the frontend
COPY Frontend/package*.json ./Frontend/
RUN cd Frontend && npm install

# Copy the rest of the application files to the container
COPY . .

# Install nodemon globally (optional for development)
RUN npm install -g nodemon

# Expose ports needed for both applications
EXPOSE 3000 5173

# Start the application in development mode
CMD ["npm", "run", "dev"]
