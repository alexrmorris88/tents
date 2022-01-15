// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../../backend/config/dbConnect";
// Controller Import
import { allUserDetailsAdmin } from "../../../../backend/controllers/orderController";
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
  .get(allUserDetailsAdmin);

export default handler;
