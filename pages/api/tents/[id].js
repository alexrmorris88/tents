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
//Error Import
import onError from "../../../backend/middlewares/errors";
// Auth Import
import {
  isAuthenticatedUser,
  authorizeUserRoles,
} from "../../../backend/middlewares/auth";

const handler = nc({ onError });
dbConnect();

handler.get(getTentById);

export default handler;
