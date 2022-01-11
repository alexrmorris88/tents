import Rental from "../modles/Rentals";
import User from "../modles/User";
import Tent from "../modles/Tent";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// Get All Users
// Path: /api/admin/customers
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

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
  const order = await Rental.findById(req.query.orderID);
  const {
    paymentInfo,
    _id,
    tent,
    user,
    rentalPickupDate,
    rentalDroptDate,
    amountPaid,
    dayOfRental,
    paidAt,
  } = order;

  const userDetails = await User.findById(user);

  const tentDetails = await Tent.findById(tent);

  const orderDetails = {
    paymentInfo,
    _id,
    tent,
    user,
    rentalPickupDate,
    rentalDroptDate,
    amountPaid,
    dayOfRental,
    paidAt,
    userDetails,
    tentDetails,
  };

  res.status(200).json({
    success: true,
    orderDetails,
  });
});

export { getAllUsers, getUserOrders, getOrderDetails };
