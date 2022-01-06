// Models Import
import Tent from "../modles/Tent";
import User from "../modles/User";
import Rentals from "../modles/Rentals";
// Utils Import
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";
import absoluteUrl from "next-absolute-url";

// Stripe Import w/ Key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate Stripe Checkout Session
// Path: /api/checkout_session/:id
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
  // Get tent details
  const tent = await Tent.findById(req.query.tentID);

  const { rentalPickupDate, rentalDroptDate, dayOfRental } = req.query;

  // get origin url
  const { origin } = absoluteUrl(req);

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/user/orders`,
    cancel_url: `${origin}/products/${tent._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.tentID,
    metadata: { rentalPickupDate, rentalDroptDate, dayOfRental },
    line_items: [
      {
        name: tent.name,
        images: [`${tent.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "cad",
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    session,
  });
});

export { stripeCheckoutSession };
