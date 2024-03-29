FROM node:20.10.0-alpine as build-stage

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]