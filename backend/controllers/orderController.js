import Tent from "../modles/Tent";
import User from "../modles/User";
import Rentals from "../modles/Rentals";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Get All User Details - ADMIN
// Path: /api/admin/user
const allUserDetailsAdmin = catchAsyncErrors(async (req, res) => {
  const { customerID } = req.query;
  const user = await User.findById(customerID);

  if (!user) {
    return next(new ErrorHandler("No user with this ID", 400));
  }

  const rental = await Rentals.find({ user: customerID });

  const userData = {
    user,
    rental,
  };

  res.status(200).json({
    success: true,
    userData,
  });
});

// Edit All User Details - ADMIN
// Path: /api/admin/user
const editUserDetailsAdmin = catchAsyncErrors(async (req, res) => {
  const { customerID } = req.query;
  let user = await User.findById(customerID);

  if (!user) {
    return next(new ErrorHandler("No user with this ID", 400));
  }

  user = await User.findByIdAndUpdate(customerID, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User has been updated",
  });
});

// Get All User Orders - ADMIN
// Path: /api/admin/orders
const getUserOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Rentals.find();

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
    createdAt,
  } = orders;

  if (!orders) {
    return next(new ErrorHandler("No order with this ID", 400));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get User Order - ADMIN
// Path: /api/admin/orders/:orderID
const getUserOrderAdmin = catchAsyncErrors(async (req, res, next) => {
  const orderInfo = await Rentals.findById(req.query.orderID);

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
    createdAt,
  } = orderInfo;

  if (!orderInfo) {
    return next(new ErrorHandler("No order with this ID", 400));
  }

  const userInfo = await User.findById(user);

  if (!userInfo) {
    return next(new ErrorHandler("No user with this ID", 400));
  }

  const tentInfo = await Tent.findById(tent);

  if (!tentInfo) {
    return next(new ErrorHandler("No tent with this ID", 400));
  }

  const order = {
    orderInfo,
    userInfo,
    tentInfo,
  };

  res.status(200).json({
    success: true,
    order,
  });
});

export {
  allUserDetailsAdmin,
  editUserDetailsAdmin,
  getUserOrdersAdmin,
  getUserOrderAdmin,
};
