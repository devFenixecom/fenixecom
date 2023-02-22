import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function authenticateTheme(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  // obtém a chave de licença da consulta
  const key = req.query.key;

  if (!key) {
    res.status(400).json({ error: 'A chave de licença é necessária' });
    return;
  }

  // verifica se a chave de licença é válida
  const licenseCollection = db.collection('Licenses');
  const license = await licenseCollection.findOne({ key });
  if (!license) {
    res.status(401).json({ error: 'Chave de licença inválida' });
    return;
  }

  // adicionando cabeçalho de autorização
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // retorna os detalhes do tema
  res.status(200).json('licença valida');
}
