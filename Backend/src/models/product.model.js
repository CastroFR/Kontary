const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    codigo:{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    status:{
        type: String,
        enum: ['disponible', 'agotado', 'inactivo'],
        default: 'disponible',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('Product', productSchema);