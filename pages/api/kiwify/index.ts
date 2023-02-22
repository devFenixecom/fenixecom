import { connectToDatabase } from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verifica se os dados do cliente foram enviados no corpo da solicitação HTTP
    if (!req.body || !req.body.Customer) {
      return res.status(400).json({ error: 'Dados do cliente não foram fornecidos' });
    }
console.log(req.body.Customer)
    // Gera uma senha aleatória
    const password = Math.random().toString(36).substring(2, 8);

    let { db } = await connectToDatabase();

    const { Customer, Subscription, order_status, order_id} = req.body;
    const { full_name, email, mobile, CPF } = Customer;
    const { start_date, status } = Subscription;

    const avatar = full_name[0];

  
    // Verifica se o email já está cadastrado
    const existingCustomer = await db.collection('Users').findOne({ email });
    
    if (existingCustomer) {
      const newLicense = {
        key: uuidv4(),
        client: existingCustomer._id,
        theme: new ObjectId("63c1948b0ff3611f84329421"),
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
        isActive: true,
        order_status,
        order_id,
      };


if (order_status !== 'paid') {
  const result = await db.collection('Licenses').find({}).sort({_id:-1}).limit(1).toArray();
  if (result && result.length) {
    const lastLicense = result[0];
    lastLicense.isActive = false;
    lastLicense.order_status = order_status;  
    lastLicense.order_id = order_id;   
    lastLicense.expiresAt = new Date(Date.now() + 0 * 24 * 60 * 60 * 1000);  
    await db.collection('Licenses').updateOne({_id: lastLicense._id}, {$set: lastLicense});
  }
  return res.status(400).json({ error: 'Licença alterada' });
}


      // Adiciona uma nova licença para o cliente existente
      await db.collection('Licenses').insertOne(newLicense);
    
      return res.status(200).json({ success: 'Licença adicionada para cliente existente' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Adiciona a senha criptografada ao objeto newCustomer
    const newCustomer = {
      name: full_name,
      email: email,
      fone: mobile,
      cpf: CPF,
      avatar: avatar,
      createdAt: start_date,
      password: hashedPassword
    };


    // Insere o documento na coleção "Users"
    const result = await db.collection('Users').insertOne(newCustomer);



    // Recupera o id do cliente
    const client = result.insertedId;


    const theme = new ObjectId('63c1948b0ff3611f84329421');


    const license = {
      key: uuidv4(),
      client,
      theme,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
      isActive: true,
      order_status,
      order_id,
    };

    await db.collection('Licenses').insertOne(license);



    // Configura o transportador de email
    let transporter = nodemailer.createTransport({
      host: 'mail.fenixecom.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@fenixecom.com',
        pass: 'AFgYrA){cwPZ'
      },
      connectionTimeout: 10000 // Aumenta o tempo limite da conexão para 10 segundos
    });

    // Define as opções do email
    let mailOptions = {
      from: '"Fènix Ecom" <no-reply@fenixecom.com>',
      to: email,
      subject: 'Bem-vindo - Aqui estão seus dados de acesso!',
      html: `
      
        <p>Olá, ${full_name}!</p>
        <p>
        Sua senha é <strong style="padding: 10px; margin: 20px; border-raius: 10px; border: 1px solid gray; max-width: 100%;">${password}</strong>
      </p>
      <p>Acesse: https://app.fenixecom.com</p>
      <p>Esperamos que você aproveite sua estadia conosco.</p>
      `
    };
 

    // Envia o email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: 'Enviado com sucesso' });
  } catch (error) {
    console.error(error); // Imprime o erro no console
    res.status(500).json({ error: 'Erro ao salvar os dados no banco de dados' });
  }
}
