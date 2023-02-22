import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { db } = await connectToDatabase();
const collection = db.collection('Theme');
const themes = await collection.find().toArray();
res.status(200).json(themes);
}