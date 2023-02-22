import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const collection = db.collection('Users');

  // Obtenha o nome do usuario a partir do parâmetro de captura na URL
  const { name} = _req.query;
  const users = await collection.findOne({ name });
  res.status(200).json(users);
}
