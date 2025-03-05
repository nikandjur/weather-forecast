# Этап 1: Сборка приложения
FROM node:20.12.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la /app # Вывод содержимого директории

# Этап 2: Копирование собранных файлов в образ с веб-сервером
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
