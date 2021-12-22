import { combineReducers } from "redux";
// Tents Reducer
import { allTentsReducer } from "./tentReducers";

const reducer = combineReducers({
  allTents: allTentsReducer,
});

export default reducer;
