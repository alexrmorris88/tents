import Rental from "../modles/Rentals";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Create New Rental
// Path: /api/rentals
const newRental = catchAsyncErrors(async (req, res, next) => {
  const {
    tent,
    rentalPickupDate,
    rentalDroptDate,
    dayOfRental,
    amountPaid,
    paymentInfo,
  } = req.body;

  const rental = await Rental.create({
    tent,
    user: req.user._id,
    rentalPickupDate,
    rentalDroptDate,
    dayOfRental,
    amountPaid,
    paymentInfo,
  });

  res.status(200).json({
    success: true,
    rental,
  });
});

export { newRental };
