import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 2;
  const skip = (page - 1) * limit;

  const { db } = await connectToDatabase();
  const collection = db.collection('Users');

  const users = await collection
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  const count = await collection.countDocuments();

  res.status(200).json({ users, totalPages: Math.ceil(count / limit) });
}
