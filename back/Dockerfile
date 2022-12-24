# Stage 1
FROM node:alpine
WORKDIR /app
COPY ./app .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]