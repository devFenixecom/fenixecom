import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../lib/mongodb";
import jwt from 'jsonwebtoken';

export async function login(email: string, password: string) {
  // Conecta ao banco de dados e obtém uma instância do banco de dados
  const { db } = await connectToDatabase();

  // Obtém a coleção "users" do banco de dados
  const usersCollection = db.collection('Users');

  // Procura um usuário com o email especificado
  const user = await usersCollection.findOne({ email: email.toLowerCase() });

  // Se o usuário não for encontrado, retorna um erro
  if (!user) {
    return { success: false, error: 'Email inválido' };
  }

  // Se a senha for incorreta, retorna um erro
  if (user.password !== password.toLowerCase()) {
    return { success: false, error: 'Senha inválida' };
  }


   // Se o usuário for encontrado e a senha estiver correta, gera um JWT
   const access_token = jwt.sign({ email: email }, 'secret_key');

   // Armazena o JWT na coleção "Users"
   await usersCollection.updateOne({ email: email }, { $set: { access_token } });
   
  // Se o usuário for encontrado e a senha estiver correta, retorna sucesso
  return { success: true, access_token };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
  const { email, password } = req.body;
  const response = await login(email, password);
  if (response.success) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      res.setHeader('Set-Cookie', `access_token=${response.access_token}; expires=${expiresAt.toUTCString()}`);
  }
  res.status(200).json(response);
  } else {
  res.status(405).end();
  }
  }