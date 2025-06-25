const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Not found' });
  res.json(category);
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) return res.status(404).json({ message: 'Not found' });
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const result = await Category.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
