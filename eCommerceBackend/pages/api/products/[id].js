import connectDB from '@/lib/db';
import Product from '@/models/Product';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  }

  if (req.method === 'PUT') {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(product);
  }

  if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end();
}
