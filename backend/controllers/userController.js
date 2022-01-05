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

// Get User Order Details
// Path: /api/rentals/:OrderID
const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Rental.findById(req.query.orderID)
    .populate({
      path: "tent",
      model: "Tent",
      select: "name price images",
    })
    .populate({
      path: "user",
      model: "User",
      select: "firstName lastName email",
    });

  res.status(200).json({
    success: true,
    order,
  });
});

export { getUserOrders, getOrderDetails };
