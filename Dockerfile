# Stage 1: Build the React frontend using Vite
FROM node:16 AS frontend-build

# Set the working directory for frontend build
WORKDIR /app/frontend

# Install dependencies (including Vite)
COPY Frontend/package.json Frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY Frontend ./

# Build the React app for production (Vite)
RUN npm run build

# Stage 2: Build the Node.js backend
FROM node:16 AS backend-build

# Set the working directory for backend build
WORKDIR /app/backend

# Install backend dependencies
COPY Backend/package.json Backend/package-lock.json ./
RUN npm install

# Copy the rest of the backend source code
COPY Backend ./

# Stage 3: Create the final image to run both frontend and backend
FROM nginx:alpine AS final

# Copy React build files to Nginx server
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Set the working directory for the backend
WORKDIR /app

# Copy backend app to the final image
COPY --from=backend-build /app/backend /app/backend

# Expose the ports for frontend (80 for Nginx) and backend (3000 for Node.js)
EXPOSE 80 3000

# Start both frontend (Nginx) and backend (Node.js) servers
CMD ["sh", "-c", "nohup node /app/backend/server.js & nginx -g 'daemon off;'"]
