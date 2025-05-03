#Usar una imagen
FROM node:18-alpine

#Establecer el directorio de trabajo
WORKDIR /usr/src/app

#Copiar el archivo de requerimientos a la imagen
COPY package*.json ./

#Instalar las dependencias
RUN npm install

#Copiar el contenido de la carpeta actual a la imagen
COPY . .

#Expone el puerto en que la app escucha
EXPOSE 3000

#comando para iniciar la app
CMD ["npm", "start"]