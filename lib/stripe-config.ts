import Stripe from 'stripe';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const createStripeProduct = async (
    product: Stripe.ProductCreateParams
  ) => {
    const createdProduct = await stripe.products.create(product);
    return createdProduct;
  };

  
export const createStripeCheckoutSession = async (
  product: Stripe.Checkout.SessionCreateParams.LineItem[]
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: product,
    success_url: `${process.env.BASE_URL}/success`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });
  return session;
};
