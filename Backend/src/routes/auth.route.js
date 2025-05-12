const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware'); // Middleware para verificar el token

router.get('/me', verificarToken, (req, res) => {
  res.json(req.user); // req.user fue adjuntado por el middleware verificarToken
});

module.exports = router;