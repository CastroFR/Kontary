const User = require('../models/user.model');

exports.registroUsuario = async (req, res) => {
    try {
        const usuario = new User(req.body);
        usuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });

    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
}