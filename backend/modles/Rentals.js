import mongoose from "mongoose";
import timeZone from "mongoose-timezone";

const rentalSchema = new mongoose.Schema({
  tent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tent",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rentalPickupDate: {
    type: Date,
    required: true,
  },
  rentalDroptDate: {
    type: Date,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  dayOfRental: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

rentalSchema.plugin(timeZone);

export default mongoose.models.Rental || mongoose.model("Rental", rentalSchema);
