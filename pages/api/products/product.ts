import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  // Recuperar todos os documentos da coleção "Products"
  const clientes = await db.collection('Product').find().toArray();

  // Crie o documento a ser inserido
  const novoCliente = {
    _id: req.body._id,
    name: req.body.name,
    description: req.body.price,
		img: req.body.img,
    file: req.body.file
  };

  // Inserir o documento na collection "Products"
  await db.collection('Product').insertOne(novoCliente);

  res.status(200).json({ clientes });
  
}
