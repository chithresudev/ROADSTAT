FROM node:20.9.0
# RUN addgroup app && adduser -S -G app app
# USER app

WORKDIR /app
COPY . ./
# COPY --chown=app:node package*.json .
RUN npm install
# RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .
RUN npm install -g nodemon
EXPOSE 3000
EXPOSE 5173
CMD ["npm","run","dev"]

