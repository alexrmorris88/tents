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
  getAllUserDetailsAdminReducer,
} from "./userReducer";
// Booking Reducer
import {
  checkRentalReducer,
  calendarAvailabilityReducer,
  userRentalsReducer,
} from "./rentalReducer";
// Orders Reducer
import { getOrdersReducer, getOrderDetailsReducer } from "./ordersReducer";

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
  getAllUserDetailsAdmin: getAllUserDetailsAdminReducer,
  // Rental Reducers
  checkRental: checkRentalReducer,
  calendarAvailability: calendarAvailabilityReducer,
  userRentals: userRentalsReducer,
  // Orders Reducer
  getOrders: getOrdersReducer,
  getOrderDetails: getOrderDetailsReducer,
});

export default reducer;
