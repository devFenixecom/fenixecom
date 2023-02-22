import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  // any other properties you want to include in the payload
}

export async function getUserData(access_token: string) {
  try {
    // Verify the JWT token
    const decoded = jwt.verify(access_token, 'secret_key') as JwtPayload;
    // Connect to the database and get a database instance
    const { db } = await connectToDatabase();
    // Get the "users" collection from the database
    const usersCollection = db.collection('Theme');
    // Find the user with the email matching the email in the decoded JWT
    const user = await usersCollection.findOne({ email: decoded.email });
    // Return the user's name and email
    if (user) {
        return { name: user.name, email: user.email, fone: user.fone, status: user.status,  };
      } else {
        return { error: 'User not found' };
      }
      
  } catch (err) {
    // If the JWT token is invalid or the user is not found, return an error
    return { error: 'Invalid token' };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get the access_token from the cookies
    const access_token = req.cookies.access_token;
    // Get the user data
    if (access_token) {
        const data = await getUserData(access_token);
        res.status(200).json(data);
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
      
    
  } else {
    res.status(405).end();
  }
}
