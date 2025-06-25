import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import { authenticate } from '@/utils/authMiddleware';

const handler = async (req, res) => {
  await connectDB();
  const userId = req.user._id;

  if (req.method === 'GET') {
    const orders = await Order.find({ user: userId }).populate('items.product');
    return res.status(200).json(orders);
  }

  if (req.method === 'POST') {
    const { address } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder = await Order.create({
      user: userId,
      items: cart.items,
      totalAmount,
      address,
      status: 'pending',
    });

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    return res.status(201).json(newOrder);
  }

  res.status(405).end();
};

export default authenticate(handler);
