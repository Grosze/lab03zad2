FROM node:14 as build-stage
WORKDIR /app
COPY package.json /app/
RUN yarn install
COPY ./ /app/
RUN npm run build

FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
