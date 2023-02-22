import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { db } = await connectToDatabase();
const collection = db.collection('Licenses');

const { _id } = req.query;
  if (!ObjectId.isValid(_id as string)) {
    res.status(400).json({ message: 'Id inválido' });
    return;
  }

// Obtenha o id do usuário a partir do parâmetro de captura na URL
const id = new ObjectId(_id as string);
const licenses = await collection.findOne({ _id: id });
res.status(200).json(licenses);
}