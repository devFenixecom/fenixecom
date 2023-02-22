import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function deleteOne(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  // Recuperar todos os documentos da coleção "Cliente"
  const clientes = await db.collection('Cliente').find().toArray();


 // Crie o documento a ser inserido
 const novoCliente = {
  _id: req.body._id,
    name: req.body.name,
    email: req.body.email
};


// Inserir o documento na collection "Cliente"
await db.collection('Cliente').deleteOne(novoCliente);


  res.status(200).json({ clientes });
}
