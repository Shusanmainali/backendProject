const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const { search, category, min_price, max_price, in_stock, sort } = req.query;
  let filter = {};

  if (search) filter.name = { $regex: search, $options: 'i' };
  if (category) filter.category = category;
  if (in_stock !== undefined) filter.inStock = in_stock === 'true';
  if (min_price || max_price) {
    filter.price = {};
    if (min_price) filter.price.$gte = parseFloat(min_price);
    if (max_price) filter.price.$lte = parseFloat(max_price);
  }

  let query = Product.find(filter).populate('category');

  if (sort === 'price_asc') query = query.sort({ price: 1 });
  else if (sort === 'price_desc') query = query.sort({ price: -1 });
  else if (sort === 'newest') query = query.sort({ createdAt: -1 });
  else if (sort === 'oldest') query = query.sort({ createdAt: 1 });

  const products = await query;
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
