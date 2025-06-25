import connectDB from '@/lib/db';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { authenticate } from '@/utils/authMiddleware';

const handler = async (req, res) => {
  await connectDB();
  const userId = req.user._id;

  if (req.method === 'GET') {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    return res.status(200).json(cart || { items: [] });
  }

  if (req.method === 'POST') {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [{ product: productId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    return res.status(200).json(cart);
  }

  if (req.method === 'DELETE') {
    const { productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    );
    return res.status(200).json(cart);
  }

  res.status(405).end();
};

export default authenticate(handler);
