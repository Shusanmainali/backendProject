import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from '@/lib/db';

export const authenticate = (handler) => async (req, res) => {
  try {
    await connectDB();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
