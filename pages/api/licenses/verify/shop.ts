import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';
import * as dns from 'dns';

export default async function authenticateTheme(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  // obtém a chave de licença e o domínio da consulta
  const key = req.query.key;
  const domain = req.query.domain;

  if (!key || !domain) {
    res.status(400).json({ error: 'Chave de licença e domínio são necessários' });
    return;
  }

  // verifica se a chave de licença é válida
  const licenseCollection = db.collection('Licenses');

  const license = await licenseCollection.findOne({ key });

  if (!license) {
    res.status(401).json({ error: 'Chave de licença inválida' });
    return;
  }


  // verifica se a licença está ativa
  if (!license.isActive) {
    res.status(401).json({ error: 'Licença inativa' });
    return;
  }

  // verifica se a licença expirou
  const currentDate = new Date();
  if (currentDate > new Date(license.expiresAt)) {
    res.status(401).json({ error: 'Licença expirada' });
    return;
  }



  // verifica se o domínio está ativo e é o mesmo da licença
  dns.lookup(domain.toString(), function (err, _address, _family) {

    if (err || domain !== license.domain) {
      res.status(401).json({ error: 'Domínio inválido ou diferente da licença' });
      return;
    }

    // adicionando cabeçalho de autorização
    res.setHeader('Access-Control-Allow-Origin', '*');

    // retorna os detalhes do tema
    res.status(200).json('licença valida');
  });
}
