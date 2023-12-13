FROM node:21.2.0-alpine3.17 AS build

WORKDIR /app
COPY . /app

RUN npm install --omit=dev
RUN npm run build

FROM nginx:1.25.3
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]