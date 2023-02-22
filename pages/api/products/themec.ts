import { NextApiRequest, NextApiResponse } from 'next'
import { Request } from 'express'
import { connectToDatabase } from '../../../lib/mongodb';



export default async function handler(req: NextApiRequest & Request, res: NextApiResponse) {

  let { db } = await connectToDatabase();

  // Recuperar todos os documentos da coleção "Product"
  const themes = await db.collection('Theme').find().toArray();

    // Crie o documento a ser inserido
    const novoTheme = {
      imagem: req.file,
    };
    console.log(req.file)
    // Inserir o documento na collection "Product"
    await db.collection('Theme').insertOne(novoTheme);

    res.status(200).json({ themes });
}
