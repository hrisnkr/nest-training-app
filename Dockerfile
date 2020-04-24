###Stage
FROM node:lts-alpine as Stage
#ENV http_proxy http://127.0.0.1:9000/localproxy.pac
#ENV https_proxy http://127.0.0.1:9000/localproxy.pac
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-alpine as Production
WORKDIR /app
COPY --from=Stage /app/dist ./dist
COPY --from=Stage /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm","run","start:prod"]