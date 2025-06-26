import { loadStripe } from "@stripe/stripe-js";

export const stripPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHAbLE_KEY);

