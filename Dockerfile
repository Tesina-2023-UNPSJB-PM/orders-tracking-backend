FROM node:lts-alpine
WORKDIR /usr/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm run build
EXPOSE 8085
RUN chown -R node /usr/app
USER node
CMD ["npm", "run", "start:prod"]
