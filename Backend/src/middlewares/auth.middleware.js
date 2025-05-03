const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verificarToken = async (req, res, next) => {
  try {
    // 1. Obtener el token del header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Buscar el usuario con el ID del token
    const usuario = await User.findById(decoded.id).select('-password');

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // 4. Adjuntar el usuario a la solicitud
    req.user = usuario;

    next(); // Continuar a la siguiente función/middleware
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado', error });
  }
};

module.exports = verificarToken;
