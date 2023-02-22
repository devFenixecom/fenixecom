import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  // Recuperar todos os documentos da coleção "Users"
  const clientes = await db.collection('Users').find().toArray();

  // Crie o documento a ser inserido

const novoCliente = {
  isVerified: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
};


  // Inserir o documento na collection "Users"
  await db.collection('Users').insertOne(novoCliente);

  res.status(200).json({ clientes });
}
