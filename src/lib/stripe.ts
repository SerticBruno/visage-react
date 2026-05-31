import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY nije postavljen u okruženju');
}

if (process.env.NODE_ENV === 'development' && secretKey.startsWith('sk_live_')) {
  console.warn(
    '[stripe] LIVE ključ u developmentu - u .env.local koristi sk_test_… i restartaj `npm run dev`'
  );
}

export const stripe = new Stripe(secretKey, {
  apiVersion: '2026-05-27.dahlia',
});
