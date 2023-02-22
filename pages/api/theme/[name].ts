import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const collection = db.collection('Theme');

  // Obtenha o nome do produto a partir do parâmetro de captura na URL
  const { name } = _req.query;
  const theme = await collection.findOne({ name });
  res.status(200).json(theme);
}
