import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs'

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

    // Verifique se o código temporário e a nova senha foram enviados no corpo da solicitação HTTP
    if (!req.body || !req.body.tempPassword || !req.body.newPassword) {
      return res.status(400).json({ error: 'Código temporário e/ou nova senha não foram fornecidos' });
    }
    
    // Compare o código temporário fornecido com o salvo no banco de dados
    const isMatch = await bcrypt.compare(req.body.tempPassword, user.temporaryPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Código temporário inválido' });
    }

    // Criptografe a nova senha fornecida
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Salve a nova senha no banco de dados
    const result = await db.collection('Users').updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    // Confirme se a nova senha foi salva corretamente
    if (result.modifiedCount !== 1) {
      return res.status(500).json({ error: 'Erro ao salvar a nova senha' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao redefinir a senha' });
  }
}
