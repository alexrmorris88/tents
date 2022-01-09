import Tent from "../modles/Tent";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";
import { roundToNearestMinutes } from "date-fns";

// Get All Tents
// Path: /api/tents
const allTents = catchAsyncErrors(async (req, res) => {
  const resPerPage = 2;
  const tentsCount = await Tent.countDocuments();

  const apiFeatures = new APIFeatures(Tent.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  let tents = await apiFeatures.query;
  let filteredTentsCount = tents.length;
  let numOfPages = Math.ceil(tentsCount / resPerPage);

  res.status(200).json({
    success: true,
    tentsCount,
    resPerPage,
    filteredTentsCount,
    numOfPages: Number(numOfPages),
    tents,
  });
});

// Create New Tent - ADMIN
// Path: /api/tents
const newTent = catchAsyncErrors(async (req, res) => {
  const tent = await Tent.create(req.body);

  res.status(200).json({
    success: true,
    tent,
  });
});

// Get Tent by ID
// Path: /api/tents/:id
const getTentById = catchAsyncErrors(async (req, res, next) => {
  const tent = await Tent.findById(req.query.id);

  if (!tent) {
    return next(new ErrorHandler("No tent with this ID", 400));
  }

  res.status(200).json({
    success: true,
    tent,
  });
});

// Get Tent - ADMIN
// Path: /api/admin/tents
const getAllTentsAdmin = catchAsyncErrors(async (req, res, next) => {
  const tents = await Tent.find();

  res.status(200).json({
    success: true,
    tents,
  });
});

// Update a Tent Details by ID - ADMIN
// Path: /api/admin/tents/:id
const updateTentById = catchAsyncErrors(async (req, res, next) => {
  let tent = await Tent.findById(req.query.tentID);

  if (!tent) {
    return next(new ErrorHandler("No tent with this ID", 400));
  }

  tent = await Tent.findByIdAndUpdate(req.query.tentID, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    tent,
  });
});

// Delete a Tent by ID - ADMIN
// Path: /api/admin/tents/:id
const deleteTentById = catchAsyncErrors(async (req, res, next) => {
  let tent = await Tent.findById(req.query.tentID);

  if (!tent) {
    return next(new ErrorHandler("No tent with this ID", 400));
  }

  await tent.remove();

  res.status(200).json({
    success: true,
    message: "Tent has been deleted",
  });
});

// Get Reviews
// Path: /api/review/getreviews
const getReviews = catchAsyncErrors(async (req, res, next) => {
  const { getreviews } = req.query;

  const tent = await Tent.findById(getreviews);

  if (!tent) {
    return next(new ErrorHandler(`No tent with this ID: ${getreviews}`, 400));
  }

  const { reviews } = tent;

  res.status(200).json({
    success: true,
    reviews,
  });
});

// Create New Review
// Path: /api/review
const createTentReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, tentID } = req.body;

  const review = {
    user: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    rating: Number(rating),
    comment,
  };

  const tent = await Tent.findById(tentID);

  const isReviewed = tent.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    tent.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
        review.firstName = req.user.firstName;
        review.lastName = req.user.lastName;
      }
    });
  } else {
    tent.reviews.push(review);
    tent.numberOfReviews = tent.reviews.length;
  }

  tent.ratings =
    tent.reviews.reduce((acc, item) => item.rating + acc, 0) /
    tent.reviews.length;

  await tent.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

export {
  allTents,
  newTent,
  getTentById,
  updateTentById,
  deleteTentById,
  createTentReview,
  getReviews,
  getAllTentsAdmin,
};
