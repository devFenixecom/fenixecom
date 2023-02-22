import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  // any other properties you want to include in the payload
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const access_token = req.cookies.access_token;
    if (access_token) {
      try {
        const decoded = jwt.verify(access_token, 'secret_key') as JwtPayload;

        const { db } = await connectToDatabase();

        const adminCollection = db.collection('Admin');
        const admin = await adminCollection.findOne({ email: decoded.email });

        if (admin) {
          // Handle the request for the "Admin" collection
          const page = parseInt(req.query.page as string) || 1;
          const limit = parseInt(req.query.limit as string) || 5;
          const skip = (page - 1) * limit;

          const collection = db.collection('Users');

          const users = await collection
            .aggregate([
              {
                $lookup: {
                  from: 'Licenses',
                  localField: '_id',
                  foreignField: 'client',
                  as: 'licenses',
                },
              },
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ])
            .toArray();

          const count = await collection.countDocuments();

          res.status(200).json({ users, totalPages: Math.ceil(count / limit) });
        } else {
          res.status(401).json({ error: 'Unauthorized' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}
