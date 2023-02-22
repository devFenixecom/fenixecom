import { connectToDatabase } from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";

interface JwtPayload {
  email: string;
  _id: string;
}

export async function getUserData(access_token: string) {
    try {
        // Verify the JWT token
        const decoded = jwt.verify(access_token, 'secret_key') as JwtPayload;
        // Connect to the database and get a database instance
        const { db } = await connectToDatabase();
        // Get the "licenses" collection from the database
        const licensesCollection = db.collection('Licenses');

        // Find the licenses with the user id
        const licenses = await licensesCollection.find({ client: decoded._id }).toArray();
        if(licenses){
            // Return the licenses
            return { licenses };
        } else {
            return { error: 'No licenses found for this user' };
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
