FROM node:17

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6969

CMD ["npm", "run dev"]

