import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verifique se o email do usuário foi enviado no corpo da solicitação HTTP
    if (!req.body || !req.body.email) {
      return res.status(400).json({ error: 'Email do usuário não foi fornecido' });
    }

    let { db } = await connectToDatabase();

    // Procure o usuário com o email fornecido
    const user = await db.collection('Users').findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Gere uma senha aleatória
    const password = uuidv4().substring(0, 8);

    // Criptografe a senha gerada aleatoriamente
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(password, salt);

    // salve a senha temporaria no banco de dados
    const result = await db.collection('Users').updateOne(
      { _id: user._id },
      { $set: { temporaryPassword: newPassword } }
    );

    // Confirme se a senha temporaria foi salva corretamente
    if (result.modifiedCount !== 1) {
      return res.status(500).json({ error: 'Erro ao salvar a senha temporaria' });
    }

    // Configure o transportador de email
    let transporter = nodemailer.createTransport({
      host: 'mail.fenixecom.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@fenixecom.com',
        pass: 'AFgYrA){cwPZ'
      },
      connectionTimeout: 10000 // Aumentar o tempo limite da conexão para 10 segundos
    });

    // Defina as opções do email
    let mailOptions = {
      from: '"Fênix Ecom" <no-reply@fenixecom.com>',
      to: req.body.email,
      subject: 'Recuperação de senha temporária',
      html: `
      
      <div class="p-4 bg-black rounded-lg shadow-md">
      <h1 class="text-lg font-medium text-blue-900">Olá, ${user.name}!</h1>
      <p class="text-gray-700 mt-2">Aqui está seu código temporário:</p>
      <p class="text-2xl border border-zinc-800 font-medium text-indigo-600 mt-2">${password}</p>
      <p class="text-gray-700 mt-4">Utilize-o para recuperar sua senha.</p>
      <p class="text-gray-700 mt-4">Esperamos que você aproveite sua estadia conosco.</p>
    </div>
      `
    };

    // Envie o email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: 'Código temporário enviado por email com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar o email com o código temporário' });
  }
}
