const express = require('express');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');

const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use('/task-manager/user', userRoutes); // Rutas de usuario
app.use('/task-manager/product', productRoutes); // Rutas de producto

module.exports = app; // Exportar la aplicación para usar en el servidor