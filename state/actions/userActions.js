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
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  USER_ORDER_DETAILS_REQUEST,
  USER_ORDER_DETAILS_SUCCESS,
  USER_ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

// Get All User Details - ADMIN
export const getAllUserDetailsAdmin = (customerID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_A_REQUEST,
    });

    const { data } = await axios.get(`/api/admin/users/${customerID}`);

    dispatch({
      type: USER_DETAILS_A_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_A_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Users - ADMIN
export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERS_A_REQUEST,
    });

    const { data } = await axios.get("/api/admin/customers");

    dispatch({
      type: GET_USERS_A_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_A_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/auth/register", userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get("/api/user/profile");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/user/update", userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/password/forgot", email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User Order
export const getUserOrder = (authCookie, req) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ORDERS_REQUEST,
    });

    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/user/orders`, config);

    dispatch({
      type: USER_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User Order Details
export const getUserOrderDetails =
  (authCookie, req, id) => async (dispatch) => {
    try {
      dispatch({
        type: USER_ORDER_DETAILS_REQUEST,
      });

      const { origin } = absoluteUrl(req);

      const config = {
        headers: {
          cookie: authCookie,
        },
      };

      const { data } = await axios.get(`${origin}/api/user/${id}`, config);

      dispatch({
        type: USER_ORDER_DETAILS_SUCCESS,
        payload: data.orderDetails,
      });
    } catch (error) {
      dispatch({
        type: USER_ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
