# Stage 1
FROM node:alpine
EXPOSE 8081
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
# RUN npm run build
CMD [ "npm", "start"]
