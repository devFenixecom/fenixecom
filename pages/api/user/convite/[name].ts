import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const collection = db.collection('Users');

  // Obtenha o nome do usuario a partir do parâmetro de captura na URL
  const { name} = _req.query;
  const user = await collection.findOne({ name });
  if (user) {
    res.status(200).json({ name: user.name });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}
