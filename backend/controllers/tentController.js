import Tent from "../modles/Tent";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

// Get All Tents
// Path: /api/tents
const allTents = catchAsyncErrors(async (req, res) => {
  const tents = await Tent.find();

  res.status(200).json({
    success: true,
    count: tents.length,
    tents,
  });
});

// Create New Tent
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

// Update a Tent Details by ID
// Path: /api/tents/:id
const updateTentById = catchAsyncErrors(async (req, res, next) => {
  let tent = await Tent.findById(req.query.id);

  if (!tent) {
    return next(new ErrorHandler("No tent with this ID", 400));
  }

  tent = await Tent.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    tent,
  });
});

// Delete a Tent by ID
// Path: /api/tents/:id
const deleteTentById = catchAsyncErrors(async (req, res, next) => {
  let tent = await Tent.findById(req.query.id);

  if (!tent) {
    return next(new ErrorHandler("No tent with this ID", 400));
  }

  await tent.remove();

  res.status(200).json({
    success: true,
    message: "Tent has been deleted",
  });
});

export { allTents, newTent, getTentById, updateTentById, deleteTentById };
