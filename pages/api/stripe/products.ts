import { createStripeProduct } from '../../../lib/stripe-config';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const product = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
  };

  try {
    const createdProduct = await createStripeProduct(product);
    console.log(createdProduct);
    res.status(200).json({ createdProduct });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default handler;

