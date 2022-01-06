import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

let stripe_api_key = process.env.STRIPE_API_KEY;
stripe_api_key = String(stripe_api_key);

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripe_api_key);
  }

  return stripePromise;
};

export default getStripe;
