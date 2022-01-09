import {
  ALL_TENTS_SUCCESS,
  ALL_TENTS_FAIL,
  TENTS_DETAILS_REQUEST,
  TENTS_DETAILS_SUCCESS,
  TENTS_DETAILS_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  GET_TENTS_A_REQUEST,
  GET_TENTS_A_SUCCESS,
  GET_TENTS_A_FAIL,
  NEW_TENTS_A_REQUEST,
  NEW_TENTS_A_SUCCESS,
  NEW_TENTS_A_FAIL,
  UPDATE_TENTS_A_REQUEST,
  UPDATE_TENTS_A_SUCCESS,
  UPDATE_TENTS_A_FAIL,
  DELETE_TENTS_A_REQUEST,
  DELETE_TENTS_A_SUCCESS,
  DELETE_TENTS_A_FAIL,
  CLEAR_ERRORS,
} from "../constants/tentConstants";

// Create Tent Reducer
export const newTentReducer = (state = { tent: {} }, action) => {
  switch (action.type) {
    case NEW_TENTS_A_REQUEST:
    case UPDATE_TENTS_A_REQUEST:
      case DELETE_TENTS_A_REQUEST:
      return {
        loading: true,
      };

    case NEW_TENTS_A_SUCCESS:
    case UPDATE_TENTS_A_SUCCESS:
      case DELETE_TENTS_A_SUCCESS:
      return {
        loading: false,
        success: true,
        tent: action.payload,
      };

    case NEW_TENTS_A_FAIL:
    case UPDATE_TENTS_A_FAIL:
      case DELETE_TENTS_A_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


// All Tents Reducer
export const allTentsReducer = (state = { tents: [] }, action) => {
  switch (action.type) {
    case GET_TENTS_A_REQUEST:
      return {
        loading: true,
      };
    case GET_TENTS_A_SUCCESS:
      return {
        loading: false,
        tents: action.payload,
      };

    case ALL_TENTS_SUCCESS:
      return {
        tentsCount: action.payload.tentsCount,
        resPerPage: action.payload.resPerPage,
        filteredTentsCount: action.payload.filteredTentsCount,
        numOfPages: action.payload.numOfPages,
        tents: action.payload.tents,
      };

    case ALL_TENTS_FAIL:
    case GET_TENTS_A_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Tent Details Reducer
export const tentDetailsReducer = (state = { tent: {} }, action) => {
  switch (action.type) {
    case TENTS_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case TENTS_DETAILS_SUCCESS:
      return {
        loading: false,
        tent: action.payload,
      };

    case TENTS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// New Review Reducer
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
    case GET_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case GET_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case NEW_REVIEW_FAIL:
    case GET_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
