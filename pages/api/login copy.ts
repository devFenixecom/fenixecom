import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from 'bcryptjs'
export async function login(email: string, password: string) {
  // Connect to the database and get a database instance
  const { db } = await connectToDatabase();

  // Get the "users" collection from the database
  const usersCollection = db.collection('Users');

  // Find a user with the specified email
  const user = await usersCollection.findOne({ email: email.toLowerCase() });

  // If the user is not found, return an error
  if (!user) {
    return { success: false, error: 'Invalid email' };
  }

  // Compare the provided password with the hashed password stored in the database
  const passwordIsValid = await bcrypt.compare(password, user.password)

  // If the password is invalid, return an error
  if (!passwordIsValid) {
    return { success: false, error: 'Invalid password' };
  }

  
  // If the user is found and the password is correct, return success
  return { success: true };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    const response = await login(email, password);
    res.status(200).json(response);
  } else {
    res.status(405).end();
  }
}
