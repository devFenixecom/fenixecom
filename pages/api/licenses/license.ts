import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';


export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const collection = db.collection('Licenses');

  // Pesquisa na collection "license"
  const license = await collection.find().toArray();

  res.status(200).json({ license });
}
