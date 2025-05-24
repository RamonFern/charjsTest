# Etapa 1: Construção da aplicação
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servindo com Nginx
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/charjs-test /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
