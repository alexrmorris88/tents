import Tent from "../modles/Tent";

// Get All Tents
// Path: /api/tents
const allTents = async (req, res) => {
  try {
    const tents = await Tent.find();

    res.status(200).json({
      success: true,
      count: tents.length,
      tents,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Create New Tent
// Path: /api/tents
const newTent = async (req, res) => {
  try {
    const tent = await Tent.create(req.body);

    res.status(200).json({
      success: true,
      tent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get Tent by ID
// Path: /api/tents/:id
const getTentById = async (req, res) => {
  try {
    const tent = await Tent.findById(req.query.id);

    if (!tent) {
      res.status(400).json({
        success: false,
        error: "No tent with this ID",
      });
    }

    res.status(200).json({
      success: true,
      tent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update a Tent Details by ID
// Path: /api/tents/:id
const updateTentById = async (req, res) => {
  try {
    let tent = await Tent.findById(req.query.id);

    if (!tent) {
      res.status(400).json({
        success: false,
        error: "No tent with this ID",
      });
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
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a Tent by ID
// Path: /api/tents/:id
const deleteTentById = async (req, res) => {
  try {
    let tent = await Tent.findById(req.query.id);

    if (!tent) {
      res.status(400).json({
        success: false,
        error: "No tent with this ID",
      });
    }

    await tent.remove();

    res.status(200).json({
      success: true,
      message: "Tent has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { allTents, newTent, getTentById, updateTentById, deleteTentById };
