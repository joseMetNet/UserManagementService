FROM node:18

WORKDIR /app    

COPY . .

RUN npm install

RUN npm run build

EXPOSE 5055

CMD [ "npm", "start" ]