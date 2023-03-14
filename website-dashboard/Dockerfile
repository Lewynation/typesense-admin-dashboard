FROM node:lts-alpine as builder

WORKDIR /app
COPY package.json .

RUN npm pkg delete scripts.prepare && npm install

COPY . .
RUN npm run build


FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

