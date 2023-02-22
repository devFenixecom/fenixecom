import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const { db } = await connectToDatabase();
        const collection = db.collection('Licenses');
        
        // Obtenha a chave de licença a partir da querystring
        const { key } = req.query;

        // Verifique se a chave existe no banco de dados
        const license = await collection.findOne({ key });
        if (!license) {
          return res.status(401).json({ error: 'Chave de licença inválida' });
        }
        res.status(200).json({ access: true });
    }catch(e){
      console.log(e)
      res.status(500).json({error:'Error ao verificar a licença'});
    }
}
