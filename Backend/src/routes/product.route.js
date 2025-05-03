const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verificarToken = require('../middlewares/auth.middleware'); // Middleware para verificar el token
const verificarRol = require('../middlewares/roles.middleware'); // Middleware para verificar el rol

router.post('/', verificarToken, verificarRol('administrador'), productController.createProduct); 

module.exports = router;