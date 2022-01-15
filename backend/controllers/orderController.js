import Tent from "../modles/Tent";
import User from "../modles/User";
import Rentals from "../modles/Rentals";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Get All User Details
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

// Edit All User Details
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

export { allUserDetailsAdmin, editUserDetailsAdmin };
