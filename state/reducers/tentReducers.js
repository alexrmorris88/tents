import {
  ALL_TENTS_SUCCESS,
  ALL_TENTS_FAIL,
  TENTS_DETAILS_SUCCESS,
  TENTS_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/tentConstants";

// All Tents Reducer
export const allTentsReducer = (state = { tents: [] }, action) => {
  switch (action.type) {
    case ALL_TENTS_SUCCESS:
      return {
        tentsCount: action.payload.tentsCount,
        resPerPage: action.payload.resPerPage,
        filteredTentsCount: action.payload.filteredTentsCount,
        tents: action.payload.tents,
      };

    case ALL_TENTS_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

// Tent Details Reducer
export const tentDetailsReducer = (state = { tent: {} }, action) => {
  switch (action.type) {
    case TENTS_DETAILS_SUCCESS:
      return {
        tent: action.payload,
      };

    case TENTS_DETAILS_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};
