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

  // const rental = await Rentals.findOne({ user: customerID });

  // if (!rental) {
  //   return next((rental = []), new ErrorHandler("No user with this ID", 400));
  // }

  // const tent = await Tent.findById({user: customerID});

  // const userData = {
  //   user,
  //   rental,
  // };

  res.status(200).json({
    success: true,
    user,
  });
});

export { allUserDetailsAdmin };
