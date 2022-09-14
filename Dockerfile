FROM --platform=linux/amd64 node:16.16.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm run build

EXPOSE 8080

COPY . .

CMD [ "npm", "start" ]
