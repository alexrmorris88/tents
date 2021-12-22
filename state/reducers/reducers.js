import { combineReducers } from "redux";
// Tents Reducer
import { allTentsReducer, tentDetailsReducer } from "./tentReducers";

const reducer = combineReducers({
  allTents: allTentsReducer,
  tentDetails: tentDetailsReducer,
});

export default reducer;
