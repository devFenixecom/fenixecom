import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const collection = db.collection('Licenses');

  if (req.method === 'GET') {
    // Pesquisa na collection "licenses"
    const licenses = await collection.find().toArray();
    res.status(200).json({ licenses });
  } else if (req.method === 'PUT') {
    // Obtenha os parâmetros enviados na requisição
    const { id, domain } = req.body;
    // Atualize o domain no registro correspondente
    const updateResult = await collection.updateOne({ _id: id }, { $set: { domain } });
    if (updateResult.matchedCount === 1) {
      res.status(200).json({ message: 'Domain atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } else {
    res.status(405).end();
  }
}
