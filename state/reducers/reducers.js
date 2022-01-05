// Redux Imports
import { combineReducers } from "redux";
// Tents Reducer
import { allTentsReducer, tentDetailsReducer } from "./tentReducers";
// User Reducer
import {
  registerUserReducer,
  loadedUserReducer,
  modifyUserReducer,
  forgotPasswordReducer,
  userOrdersReducer,
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
  // user reducer
  registerUser: registerUserReducer,
  loadedUser: loadedUserReducer,
  modifyUser: modifyUserReducer,
  forgotPassword: forgotPasswordReducer,
  userOrders: userOrdersReducer,
  // Rental Reducers
  checkRental: checkRentalReducer,
  calendarAvailability: calendarAvailabilityReducer,
  userRentals: userRentalsReducer,
});

export default reducer;
