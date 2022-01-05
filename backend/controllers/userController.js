import Rental from "../modles/Rentals";
import User from "../modles/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// Get All User Booking
// Path: /api/rentals/user
const getUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Rental.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

export { getUserOrders };
