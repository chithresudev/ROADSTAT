# Backend Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
# Expose the port the app will run on
EXPOSE 5000

CMD ["npm", "start"]  # Adjust to your backend start script
