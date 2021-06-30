# Step 1
FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json /app/
RUN npm install
COPY .browserslistrc angular.json karma.conf.js tsconfig.app.json tsconfig.json tsconfig.spec.json /app/
COPY ./src /app/src
RUN npm run build

# Step 2
FROM nginx:1.18-alpine
COPY --from=build /app/dist/chat-ui /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY res/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
