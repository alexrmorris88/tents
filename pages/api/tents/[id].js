// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../backend/config/dbConnect";
// Controller Import
import {
  getTentById,
  updateTentById,
  deleteTentById,
} from "../../../backend/controllers/tentController";

const handler = nc();
dbConnect();

handler.get(getTentById);
handler.put(updateTentById);
handler.delete(deleteTentById);

export default handler;
