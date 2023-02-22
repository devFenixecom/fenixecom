import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  // Recuperar todos os documentos da coleção "Product"
  const themes = await db.collection('Theme').find().toArray();

    // Crie o documento a ser inserido
    const novoTheme = {
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      imagem: req.body.imagem,
      theme: req.body.theme
    };

    // Inserir o documento na collection "Product"
    await db.collection('Theme').insertOne(novoTheme);

    res.status(200).json({ themes });
 
}

