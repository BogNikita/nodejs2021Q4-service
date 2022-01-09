FROM node:16-alpine as build
WORKDIR /usr/app
COPY package*.json .
RUN npm install

FROM node:16-alpine
WORKDIR /usr/app
COPY --from=build /usr/app .
COPY . .
EXPOSE 4000
CMD ["npm", "start"]