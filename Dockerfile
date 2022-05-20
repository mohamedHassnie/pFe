
FROM node:14-alpine 
WORKDIR  /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3017
CMD ["npm", "start"]

#stage de server nginx pour démarer app

