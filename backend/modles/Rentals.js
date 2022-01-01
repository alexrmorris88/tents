import mongoose from "mongoose";
import timeZone from "mongoose-timezone";

const bookingSchema = new mongoose.Schema({
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
  dayRented: {
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
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.plugin(timeZone);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
