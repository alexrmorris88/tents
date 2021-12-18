import mongoose from "mongoose";

const tentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter tent name"],
    trim: true,
    maxlength: [100, "Tent name cannot exceed 100 characters"],
  },
  sku: {
    type: Number,
    required: [true, "Please enter tent sku"],
  },
  price: {
    type: Number,
    required: [true, "Please enter tent price"],
    maxlength: [6, "Tent price cannot exceed 6 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter tent description"],
  },
  maxCapacity: {
    type: Number,
    required: [true, "Please enter tent capacity"],
  },
  size: {
    type: String,
    required: [true, "Please enter tent size"],
  },
  availability: {
    type: Boolean,
    required: [true, "Please enter tent availability"],
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter tent category"],
    enum: {
      values: ["Small", "Medium", "Large"],
      message: "Please select correct tent category",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Tent || mongoose.model("Tent", tentSchema);
