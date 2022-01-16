import {
  GET_ALL_ORDERS_ADMIN_REQUEST,
  GET_ALL_ORDERS_ADMIN_SUCCESS,
  GET_ALL_ORDERS_ADMIN_FAIL,
  GET_ORDER_ADMIN_REQUEST,
  GET_ORDER_ADMIN_SUCCESS,
  GET_ORDER_ADMIN_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

// Get Order Details
export const getOrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_ADMIN_REQUEST:
      return {
        loading: true,
      };

    case GET_ORDER_ADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case GET_ORDER_ADMIN_FAIL:
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

// Get All Orders
export const getOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_ADMIN_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_ORDERS_ADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };

    case GET_ALL_ORDERS_ADMIN_FAIL:
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
