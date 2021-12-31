import User from "../modles/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../../utils/sendEmail";
import crypto from "crypto";

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
    return new ErrorHandler("User not found", 404);
  }

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

// Forgot Password
// Path: /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return new ErrorHandler("User not found", 404);
  }

  // Get Reset Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create Reset Password URL
  const { origin } = absoluteUrl(req);
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset url is: \n\n ${resetUrl} \n\n if you have not requested this email, then please ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "SJ Tents Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
// Path: /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset token is invalid or expired", 404));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 404));
  }

  // Set the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated",
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

export {
  register,
  getUserProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
};
