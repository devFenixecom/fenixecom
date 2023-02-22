import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
const { db } = await connectToDatabase();
const collection = db.collection('Licenses');

//Listagem das licencas
const licenses = await collection.find().toArray();
res.status(200).json(licenses);
}