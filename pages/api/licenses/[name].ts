import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const collection = db.collection('Licenses');

  // Obtenha o id do usuario a partir do parâmetro de captura na URL
  const { name } = req.query;
  const licenses = await collection.findOne({ name });
  res.status(200).json(licenses);
}
