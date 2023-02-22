import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  // any other properties you want to include in the payload
}

export async function getUserThemes(userId: string) {
  const { db } = await connectToDatabase();
  const licensesCollection = db.collection('Licenses');
  const themes = await licensesCollection.find({ client: userId, theme: { $ne: null } }).toArray();
  return themes.map(theme => theme.theme);
}

export async function getUserData(access_token: string) {
  try {
    // Verify the JWT token
    const decoded = jwt.verify(access_token, 'secret_key') as JwtPayload;
    // Connect to the database and get a database instance
    const { db } = await connectToDatabase();
    // Get the "users" and "licenses" collection from the database
    const usersCollection = db.collection('Users');
    const licensesCollection = db.collection('Licenses');
    const themesCollection = db.collection('Theme');
         
            
    // Find the user with the email matching the email in the decoded JWT
    const user = await usersCollection.findOne({ email: decoded.email });
    // Find the licenses with the user id
    if (user) {
        const licenses = await licensesCollection.find({ client: user._id }).toArray();
        const themes = await themesCollection.find({  }).toArray();
 
        
        // Return the user's name, email, fone, status, licenses and themes
        return { name: user.name, email: user.email, fone: user.fone, status: user.status, licenses, themes };
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
