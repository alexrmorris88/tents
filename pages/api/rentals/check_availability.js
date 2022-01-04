// Next Imports
import nc from "next-connect";
// Databse Import
import dbConnect from "../../../backend/config/dbConnect";
// Controller Import
import { rentalCalendarAvailability } from "../../../backend/controllers/rentalController";
//Utils/Middlewares Import
import onError from "../../../backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(rentalCalendarAvailability);

export default handler;
