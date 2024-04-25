FROM node:18.17.1-alpine as build-stage
WORKDIR /app/frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]