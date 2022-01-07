// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../backend/config/dbConnect";
// Controller Import
import { getReviews } from "../../../backend/controllers/tentController";
//Utils/Middlewares Import
import onError from "../../../backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(getReviews);

export default handler;
