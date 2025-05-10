const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verificarToken = require('../middlewares/auth.middleware'); // Middleware para verificar el token
const verificarRol = require('../middlewares/roles.middleware'); // Middleware para verificar el rol

router.post('/', verificarToken, verificarRol('administrador'), productController.createProduct); 
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', verificarToken, verificarRol('administrador'), productController.updateProduct);
router.delete('/:id', verificarToken, verificarRol('administrador'), productController.deleteProduct);

module.exports = router;