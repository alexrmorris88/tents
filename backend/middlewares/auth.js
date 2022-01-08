import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/client";

// Get User Session
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  req.user = session.user;
  next();
});

// Handling user roles
// Pass all the roles allowed to access the resource through the below function
const authorizeUserRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `This user does not have access to this resource.`,
          403
        )
      );
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeUserRoles };
