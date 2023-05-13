FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN ls -a

RUN npm install

COPY . .

CMD ["npm", "run", "start"]