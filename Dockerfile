# Etapa 1: Build do Angular
FROM node:18 AS build

WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# Etapa 2: Servir com NGINX
FROM nginx:alpine

# Copia os arquivos gerados pelo Angular para o NGINX
COPY --from=build /app/dist/charjs-test /usr/share/nginx/html

# Remove configuração default e adiciona a nossa (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
