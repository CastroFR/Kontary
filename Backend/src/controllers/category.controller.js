const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'La categoría ya existe' });
      }
  
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(201).json({ message: 'Category created successfully', newCategory });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la categoría', error });
    }
  };