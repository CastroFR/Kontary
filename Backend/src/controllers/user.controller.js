const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.registroUsuario = async (req, res) => {
    try {
        // Hasheamos la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const usuario = new User({
            ...req.body,
            password: hashedPassword
        });

        await usuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
    } catch (error) {
        if (error.code === 11000) {
            // Identifica qué campo generó el error de clave duplicada
            const campo = Object.keys(error.keyPattern)[0];
            let mensaje = 'Ya existe un registro con ese valor.';

            if (campo === 'username') {
                mensaje = 'El nombre de usuario ya está en uso.';
            } else if (campo === 'email') {
                mensaje = 'El correo electrónico ya está registrado.';
            }

            return res.status(400).json({ message: mensaje });
        }

        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

// Login
exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: usuario._id, role: usuario.role },
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRATION } // Tiempo de expiración del token
        );

        res.status(200).json({ message: 'Inicio de sesión exitoso', token, usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
