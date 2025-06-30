# FROM node:18
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# RUN npm install
RUN npm install --production

COPY . .

EXPOSE 5050

CMD ["node", "server.js"]



