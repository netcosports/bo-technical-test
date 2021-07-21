# Stage 1
FROM node:15.11.0-alpine3.10 AS build-step

ARG REACT_APP_ENVIRONMENT
ARG REACT_APP_AWS_KEY

RUN mkdir /src
WORKDIR /src
COPY package.json /src
COPY package-lock.json /src
RUN npm install
COPY . /src
RUN npm run build


# Stage 2
FROM nginx:1.19.8-alpine
COPY --from=build-step /src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf