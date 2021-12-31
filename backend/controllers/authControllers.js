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
      message: "Passwords do not match",
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

// Update User Profile
// Path: /user/update
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let user = await User.findById(req.user._id);

  if (!user) {
    return next(
      res.status(404).json({
        success: false,
        message: "User does not exist",
      })
    );
  }

  user = await User.findByIdAndUpdate(req.user._id, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLowerCase();

    if (password) user.password = password;
  }

  // Handle avatar

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

// Current User Profile
// Path: /api/profile
const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export { register, getUserProfile, updateProfile };
