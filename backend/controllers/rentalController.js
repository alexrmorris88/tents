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

<<<<<<< HEAD
export { newRental };
=======
// Check Rental Availability
// Path: /api/rentals/check
const rentalAvailability = catchAsyncErrors(async (req, res, next) => {
  let { tentId, rentalPickupDate, rentalDroptDate } = req.query;

  rentalPickupDate = new Date(rentalPickupDate);
  rentalDroptDate = new Date(rentalDroptDate);

  const rental = await Rental.find({
    tent: tentId,
    $and: [
      {
        rentalPickupDate: {
          $lte: rentalDroptDate,
        },
      },
      {
        rentalDroptDate: {
          $gte: rentalPickupDate,
        },
      },
    ],
  });

  // Check if Rental Dates are available
  let isAvailable;

  if (rental && rental.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  if (rentalPickupDate > rentalDroptDate) {
    isAvailable = false;
  }

  if (rentalDroptDate < rentalPickupDate) {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

// Check Rental Dates and Block on Calendar
// Path: /api/rentals/check_availability
const rentalCalendarAvailability = catchAsyncErrors(async (req, res, next) => {
  const { tentId } = req.query;

  const rentals = await Rental.find({ tent: tentId });

  let rentalDates = [];

  const timeDifference = moment().utcOffset() / 60;

  rentals.forEach((rental) => {
    const rentalPickupDate = moment(rental.rentalPickupDate).add(
      timeDifference,
      "hours"
    );
    const rentalDroptDate = moment(rental.rentalDroptDate).add(
      timeDifference,
      "hours"
    );

    const range = moment.range(
      moment(rentalPickupDate),
      moment(rentalDroptDate)
    );

    const dates = Array.from(range.by("day"));
    rentalDates = rentalDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    rentalDates,
  });
});

// Get All User Booking
// Path: /api/rentals/user
const getUserRentals = catchAsyncErrors(async (req, res, next) => {
  const rentals = await Rental.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    rentals,
  });
});

export {
  newRental,
  rentalAvailability,
  rentalCalendarAvailability,
  getUserRentals,
};
>>>>>>> 5d3f897... added order page
