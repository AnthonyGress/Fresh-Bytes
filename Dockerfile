FROM --platform=linux/amd64 node:16.20.1-slim AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build-local

FROM --platform=linux/amd64 node:16.20.1-slim

WORKDIR /app

COPY --from=build app/client/build/ ./client/build
COPY --from=build app/package.json ./
COPY --from=build app/server ./server

EXPOSE 8080

CMD [ "npm", "start" ]
