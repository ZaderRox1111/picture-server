FROM node:14.17.1-alpine

RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
RUN npm install --only=production

EXPOSE 8080

CMD ["node", "app.js"]