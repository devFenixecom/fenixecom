import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body); // isso imprimirá os dados enviados para a API
  console.log(req.headers); // imprime os cabeçalhos da requisição

  
  res.status(200).json({ success: true });
};
