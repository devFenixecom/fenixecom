import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
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

   // Se o usuário for encontrado e a senha estiver correta, gera um JWT
   const access_token = jwt.sign({ email: email }, 'secret_key');

   // Armazena o JWT na coleção "Users"
   await usersCollection.updateOne({ email: email }, { $set: { access_token } });
   
  // If the user is found and the password is correct, return success
  return { success: true, access_token };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    
  const response = await login(email, password);
  if (response.success) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1); // Definir o tempo de expiração como 1 dia a partir da data atual
      res.setHeader('Set-Cookie', `access_token=${response.access_token}; expires=${expiresAt.toUTCString()};`);
     
  }
  res.status(200).json(response);
  } else {
  res.status(405).end();
  }
  }