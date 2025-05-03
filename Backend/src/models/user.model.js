const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['usuario', 'administrador'],
    default: 'usuario', // Los usuarios nuevos serán "Usuario" por defecto
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', userSchema);
