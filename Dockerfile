# Stage 1: Build the React frontend
FROM node:16 AS frontend-build

# Set the working directory for frontend build
WORKDIR /app/frontend

# Install dependencies and build the React app
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# Stage 2: Build the Node.js backend
FROM node:16 AS backend-build

# Set the working directory for backend build
WORKDIR /app/backend

# Install backend dependencies
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
COPY ./backend ./

# Stage 3: Create the final image to run both frontend and backend
FROM nginx:alpine AS final

# Copy React build files to Nginx server
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy backend app to run with Node.js
WORKDIR /app
COPY --from=backend-build /app/backend /app/backend

# Expose the ports for frontend and backend
EXPOSE 80 3000

# Start both frontend (Nginx) and backend (Node.js) servers
CMD ["sh", "-c", "nohup node /app/backend/server.js & nginx -g 'daemon off;'"]
