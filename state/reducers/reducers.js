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
} from "./userReducer";

const reducer = combineReducers({
  // tent reducer
  allTents: allTentsReducer,
  tentDetails: tentDetailsReducer,
  // user reducer
  registerUser: registerUserReducer,
  loadedUser: loadedUserReducer,
  modifyUser: modifyUserReducer,
  forgotPassword: forgotPasswordReducer,
});

export default reducer;
