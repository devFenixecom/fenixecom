import { connectToDatabase } from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verifique se os dados do cliente foram enviados no corpo da solicitação HTTP
    if (!req.body || !req.body.Customer) {
      return res.status(400).json({ error: 'Dados do cliente não foram fornecidos' });
    }

    // Gere uma senha aleatória
    const password = uuidv4().substring(0, 8);

    let { db } = await connectToDatabase();

    console.log(req.body); // Imprime os dados recebidos no console

    const { Customer, Subscription } = req.body;
    const { full_name, email, mobile, CPF } = Customer;
    const { start_date, status } = Subscription;

    // Criptografe a senha
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');

    // Adicione a senha criptografada ao objeto newCustomer
    const newCustomer = { full_name, email, mobile, CPF, start_date, status, password: crypted };
    console.log(newCustomer); // Imprime o objeto newCustomer no console

    // Insere o documento na coleção "Users"
    const result = await db.collection('Users').insertOne(newCustomer);
    console.log(result); // Imprime o resultado da operação de inserção no console

        // Configure o transportador de email
        let transporter = nodemailer.createTransport({
          host: 'mail.suacopy.com',
          port: 465,
          secure: true,
          auth: {
            user: 'no-reply@suacopy.com',
            pass: 'Tg5kT.;=;2_e'
          },
          connectionTimeout: 10000 // Aumentar o tempo limite da conexão para 10 segundos
        });
    
        // Descriptografe a senha
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(crypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
    
        // Crie uma URL de recuperação de senha
        const recoveryLink = `localhost:3000/recovery?email=${email}`;
    
        // Defina as opções do email
        let mailOptions = {
          from: '"Drop teste" <no-reply@suacopy.com>',
          to: email,
          subject: 'Bem-vindo ao nosso aplicativo!',
          html: `
            <p>Olá, ${full_name}! Bem-vindo ao nosso aplicativo.</p>
            <p>
            Sua senha é <strong style="padding: 10px; margin: 20px; border-raius: 10px; border: 1px solid gray; max-width: 100%;">${decrypted}</strong>
          </p>
          <p>
            Clique aqui para recuperar sua senha: 
            <a href="${recoveryLink}">Recuperar senha</a>
          </p>
          <p>Esperamos que você aproveite sua estadia conosco.</p>
          `
        };
    
        // Envie o email
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ success: 'Enviados com sucesso' });
      } catch (error) {
        console.error(error); // Imprime o erro no console
        res.status(500).json({ error: 'Erro ao salvar os dados no banco de dados' });
      }
    }
    

