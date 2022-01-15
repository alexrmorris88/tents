import {
  GET_USERS_A_REQUEST,
  GET_USERS_A_SUCCESS,
  GET_USERS_A_FAIL,
  USER_DETAILS_A_REQUEST,
  USER_DETAILS_A_SUCCESS,
  USER_DETAILS_A_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  USER_ORDER_DETAILS_REQUEST,
  USER_ORDER_DETAILS_SUCCESS,
  USER_ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

// Get All Users Reducer - ADMIN
export const getAllUsersAdminReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_A_REQUEST:
      return {
        loading: true,
      };

    case GET_USERS_A_SUCCESS:
      return {
        loading: false,
        success: true,
        users: action.payload,
      };

    case GET_USERS_A_FAIL:
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

// Get All Users Reducer - ADMIN
export const getAllUserDetailsAdminReducer = (
  state = { users: {} },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_A_REQUEST:
      return {
        loading: true,
      };

    case USER_DETAILS_A_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };

    case USER_DETAILS_A_FAIL:
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

// Auth reducer
export const registerUserReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REGISTER_USER_FAIL:
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

// Load user reducer
export const loadedUserReducer = (
  state = { loading: true, user: null },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
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

// User reducer
export const modifyUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_PROFILE_FAIL:
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

// Forgot Password
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
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

// User Orders
export const userOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case USER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case USER_ORDERS_FAIL:
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

// User Orders
export const userOrderDetailsReducer = (
  state = { orderDetails: {} },
  action
) => {
  switch (action.type) {
    case USER_ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case USER_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
      };

    case USER_ORDER_DETAILS_FAIL:
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
