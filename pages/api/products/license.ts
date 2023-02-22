import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { db } = await connectToDatabase();

  // Recuperar todos os documentos da coleção "Cliente"
  const license = await db.collection('Licenses').find().toArray();

  // Crie o documento a ser inserido
  const novalicense = {
    _id: req.body._id,
    subscriptionPlan: req.body.subscriptionPlan,
    statusInvoice: req.body.statusInvoice,
    registrationDate: req.body.registrationDate,
    getUpdateNotice: req.body.getUpdateNotice,
    isActive: req.body.isActive,
    client: req.body.client,
    theme: req.body.theme,
    key: req.body.key,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    domain: req.body.domain,
    permanentDomain: req.body.permanentDomain
  };

  // Inserir o documento na collection "Cliente"
  await db.collection('Licenses').insertOne(novalicense);

  res.status(200).json({ license });
}
