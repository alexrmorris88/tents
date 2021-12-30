// Redux Imports
import { combineReducers } from "redux";
// Tents Reducer
import { allTentsReducer, tentDetailsReducer } from "./tentReducers";
// User Reducer
import { authReducer } from "./userReducer";

const reducer = combineReducers({
  // tent reducer
  allTents: allTentsReducer,
  tentDetails: tentDetailsReducer,
  // user reducer
  auth: authReducer,
});

export default reducer;
