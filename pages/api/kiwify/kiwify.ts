import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verifique se os dados do cliente foram enviados no corpo da solicitação HTTP
    if (!req.body || !req.body.Customer) {
      return res.status(400).json({ error: 'Dados do cliente não foram fornecidos' });
    }

    let { db } = await connectToDatabase();

    console.log(req.body); // Imprime os dados recebidos no console

    const { Customer } = req.body;
    const { full_name, email, mobile, CPF } = Customer;

    const newCustomer = { full_name, email, mobile, CPF };
    console.log(newCustomer); // Imprime o objeto newCustomer no console

    // Insere o documento na coleção "Users"
    const result = await db.collection('Users').insertOne(newCustomer);
    console.log(result); // Imprime o resultado da operação de inserção no console

    res.status(200).json({ success: 'Enviados com sucesso' });
  } catch (error) {
    console.error(error); // Imprime o erro no console
    res.status(500).json({ error: 'Erro ao salvar os dados no banco de dados' });
  }
}
