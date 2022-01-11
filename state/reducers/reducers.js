// Redux Imports
import { combineReducers } from "redux";
// Tents Reducer
import {
  allTentsReducer,
  tentDetailsReducer,
  reviewReducer,
  newTentReducer,
} from "./tentReducers";
// User Reducer
import {
  registerUserReducer,
  loadedUserReducer,
  modifyUserReducer,
  forgotPasswordReducer,
  userOrdersReducer,
  userOrderDetailsReducer,
  getAllUsersAdminReducer,
} from "./userReducer";
// Booking Reducer
import {
  checkRentalReducer,
  calendarAvailabilityReducer,
  userRentalsReducer,
} from "./rentalReducer";

const reducer = combineReducers({
  // tent reducer
  allTents: allTentsReducer,
  tentDetails: tentDetailsReducer,
  review: reviewReducer,
  newTent: newTentReducer,
  // user reducer
  registerUser: registerUserReducer,
  loadedUser: loadedUserReducer,
  modifyUser: modifyUserReducer,
  forgotPassword: forgotPasswordReducer,
  userOrders: userOrdersReducer,
  userOrderDetails: userOrderDetailsReducer,
  getAllUsersAdmin: getAllUsersAdminReducer,
  // Rental Reducers
  checkRental: checkRentalReducer,
  calendarAvailability: calendarAvailabilityReducer,
  userRentals: userRentalsReducer,
});

export default reducer;
