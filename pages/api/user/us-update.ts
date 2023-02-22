import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
        const usersCollection = db.collection('Users');
        const user = await usersCollection.findOne({ email: decoded.email });
        if (user) {
          res.status(200).json({ name: user.name, email: user.email, avatar: user.avatar, fone: user.fone, status: user.status, client: user.client });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else if (req.method === 'POST') {
    const access_token = req.cookies.access_token;
    if (access_token) {
      try {
        const decoded = jwt.verify(access_token, 'secret_key') as JwtPayload;
        const { name, password } = req.body;
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('Users');
        const user = await usersCollection.findOne({ email: decoded.email });
        if (user) {
            const { name, password, newPassword, fone } = req.body;
            if (!newPassword || bcrypt.compareSync(password, user.password)) {
                const updatedUser = {
                    ...user,
                    name: name || user.name,
                    avatar: name ? name.charAt(0) : user.avatar,
                    password: newPassword ? bcrypt.hashSync(newPassword, 6) : user.password,
                    fone: fone || user.fone,
                };
                await usersCollection.updateOne({ email: decoded.email }, { $set: updatedUser });
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(401).json({ error: 'Incorrect password' });
            }
        } else  {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(405).end();
  }
}
