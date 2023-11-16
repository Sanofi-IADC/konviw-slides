FROM --platform=linux/amd64 node:16.13.0-alpine

WORKDIR /app

ENV APP_BASE_URL=/
ENV NODE_ENV=deployment

COPY package.json .
COPY package-lock.json .
COPY . .

RUN npm cache clean --force

RUN npm ci --legacy-peer-deps

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
