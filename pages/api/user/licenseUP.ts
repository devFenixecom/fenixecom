import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb'

interface JwtPayload {
  email: string;
}

// Atualizar a licença
export async function updateLicense(id: string, domain: string) {
  try {
    // Conecte-se ao banco de dados e obtenha uma instância da collection Licenses
    const { db } = await connectToDatabase();
    const licensesCollection = db.collection('Licenses');

    // Utilize o método updateOne do MongoDB para atualizar a licença específica com o novo valor do domínio
    const updatedLicense = await licensesCollection.updateOne({ _id: new ObjectId(id) }, { $set: { domain } });
    return updatedLicense;
  } catch (err) {
    return { error: 'Erro ao atualizar licença' };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Verifica se o usuário esta autenticado
    const access_token = req.cookies.access_token;
    if (access_token) {
      try {
        // Verifica o JWT token
        const decoded = jwt.verify(access_token, 'secret_key') as JwtPayload;
        // Pega o ID da licença e o novo valor do domínio da requisição
        const { id, domain } = req.body;
        // Atualiza a licença
        const updatedLicense = await updateLicense(id, domain);
        // Retorna a licença atualizada
        res.status(200).json(updatedLicense);
      } catch (err) {
        // Se o JWT token for inválido, retorna um erro
        res.status(401).json({ error: 'Token inválido' });
      }
    } else {
      // Se o usuário não estiver autenticado, retorna um erro
      res.status(401).json({ error: 'Usuário não autenticado' });
    }
  } else {
    // Se o método da requisição não for POST, retorna um erro
    res.status(405).end();
  }
}
