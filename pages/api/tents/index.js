// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../backend/config/dbConnect";
// Controller Import
import { allTents, newTent } from "../../../backend/controllers/tentController";
//Utils/Middlewares Import
import onError from "../../../backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(allTents);
handler.post(newTent);

export default handler;
