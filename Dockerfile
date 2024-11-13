# Use the Node.js image as the base
FROM node:22.9.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json files for backend and frontend
COPY Backend/package*.json ./Backend/
COPY Frontend/package*.json ./Frontend/

# Install dependencies for backend and frontend
RUN cd Backend && npm install
RUN cd Frontend && npm install

# Copy the rest of the application files to the container
COPY . .

# Install global dependencies (concurrently and nodemon)
RUN npm install -g nodemon concurrently

# Expose ports for both backend and frontend
EXPOSE 3000 5173

# Start the application in development mode (concurrently runs both backend and frontend)
CMD ["npm", "run", "dev"]
