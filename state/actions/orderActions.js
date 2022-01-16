import {
  GET_ALL_ORDERS_ADMIN_REQUEST,
  GET_ALL_ORDERS_ADMIN_SUCCESS,
  GET_ALL_ORDERS_ADMIN_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

// Get All Admin Orders
export const getAllOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_ORDERS_ADMIN_REQUEST,
    });

    const { data } = await axios.get("/api/admin/orders");

    dispatch({
      type: GET_ALL_ORDERS_ADMIN_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_ADMIN_FAIL,
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
