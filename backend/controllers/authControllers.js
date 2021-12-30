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

// @route   POST /users/login
// @desc    Loggin with Auth Token
// @access  Public
const login = catchAsyncErrors(async (req, res, next) => {
  let { email, password } = req.body;

  // Check if email and password is entered
  if (!email || !password) {
    throw new Error("Please enter email or password");
  }

  // Set email to lowercase
  email = email.toLowerCase();

  // Finding the user in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new Error("Invalid Email or Password");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export { register, login };
