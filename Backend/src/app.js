const express = require('express');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const authRoutes = require('./routes/auth.route');

const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200', 
})); 

app.use(express.json()); // Middleware para parsear JSON
app.use('/kontary/user', userRoutes); // Rutas de usuario
app.use('/kontary/product', productRoutes); // Rutas de producto
app.use('/kontary/categories', categoryRoutes); // Rutas de categoría
app.use('/kontary/auth', authRoutes);

module.exports = app; // Exportar la aplicación para usar en el servidor