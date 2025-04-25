const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};