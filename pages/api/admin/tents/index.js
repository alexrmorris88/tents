// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../../backend/config/dbConnect";
// Controller Import
import { getAllTentsAdmin } from "../../../../backend/controllers/tentController";
//Utils/Middlewares Import
import onError from "../../../../backend/middlewares/errors";
// Auth Import
import {
  isAuthenticatedUser,
  authorizeUserRoles,
} from "../../../../backend/middlewares/auth";

const handler = nc({ onError });
dbConnect();

handler
  .use(isAuthenticatedUser, authorizeUserRoles("admin"))
  .get(getAllTentsAdmin);

export default handler;
