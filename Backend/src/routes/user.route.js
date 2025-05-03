const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.registroUsuario);
router.post('/login', userController.loginUsuario); // Ruta para iniciar sesión

module.exports = router;