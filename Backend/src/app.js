const express = require('express');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');

const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use('/kontary/user', userRoutes); // Rutas de usuario
app.use('/kontary/product', productRoutes); // Rutas de producto
app.use('/kontary/categories', categoryRoutes); // Rutas de categoría

module.exports = app; // Exportar la aplicación para usar en el servidor