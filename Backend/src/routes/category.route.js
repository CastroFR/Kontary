const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const verificarToken = require('../middlewares/auth.middleware');
const verificarRol = require('../middlewares/roles.middleware');

router.post('/', verificarToken, verificarRol('administrador'), categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', verificarToken, verificarRol('administrador'), categoryController.updateCategory);
router.delete('/:id', verificarToken, verificarRol('administrador'), categoryController.deleteCategory);

module.exports = router;