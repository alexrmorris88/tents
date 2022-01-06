// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../backend/config/dbConnect";
// Controller Import
import { stripeCheckoutSession } from "../../../backend/controllers/paymentControllers";
//Utils/Middlewares Import
import onError from "../../../backend/middlewares/errors";
// Auth Import
import { isAuthenticatedUser } from "../../../backend/middlewares/auth";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default handler;
