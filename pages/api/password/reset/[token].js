// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../../backend/config/dbConnect";
// Controller Import
import { resetPassword } from "../../../../backend/controllers/authControllers";
//Utils/Middlewares Import
import onError from "../../../../backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.put(resetPassword);

export default handler;
