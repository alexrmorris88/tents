import User from "../modles/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Regester User
// Path: /api/auth/register
const register = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Check if Confirm Password Matches
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      error: "Passwords do not match",
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
  });

  res.status(200).json({
    success: true,
    message: "Account Created Successfully!",
    user,
  });
});

export { register };
