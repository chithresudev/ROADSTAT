# Frontend Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
# Expose port 80
EXPOSE 80
CMD ["npx", "vite", "preview", "--host"]
