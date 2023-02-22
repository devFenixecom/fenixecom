import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function authenticateTheme(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  // obtém a chave de licença e os domínios da consulta
  const key = req.query.key;
  const domain = req.query.domain;
  const domainpri = req.query.domainpri;

  if (!key || (!domain && !domainpri)) {
    res.status(400).json({ error: 'Chave de licença e um domínio são necessários' });
    return;
  }

  // verifica se a chave de licença é válida
  const licenseCollection = db.collection('Licenses');
  const license = await licenseCollection.findOne({ key });
  if (!license) {
    res.status(401).json({ error: 'Chave de licença inválida' });
    return;
  }

  // verifica se o domínio está ativo e é o mesmo da licença
  if (domain !== license.domain && domainpri !== license.domainpri) {
    res.status(401).json({ error: 'Domínio inválido' });
    return;
  }

  // adicionando cabeçalho de autorização
  res.setHeader('Access-Control-Allow-Origin', '*');

  // retorna os detalhes do tema
  res.status(200).json('licença valida');
}
