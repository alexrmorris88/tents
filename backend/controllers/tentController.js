import Tent from "../modles/Tent";

const allTents = (req, res) => {
  res.status(200).json({
    success: true,
    message: "All tents",
  });
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

export { allTents, newTent };
