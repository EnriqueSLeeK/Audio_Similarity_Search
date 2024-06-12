
FROM node:21-alpine3.17

WORkDIR /usr/var/app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
