import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  // Recuperar todos os documentos da coleção "Products"
  const clientes = await db.collection('Products').find().toArray();

  // Crie o documento a ser inserido
  const novoCliente = {
    _id: req.body._id,
    name: req.body.name,
    description: req.body.price,
		price: req.body.price,
  };

  // Inserir o documento na collection "Products"
  await db.collection('Products').insertOne(novoCliente);

  res.status(200).json({ clientes });
  
}
