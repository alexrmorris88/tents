import {
  ALL_TENTS_SUCCESS,
  ALL_TENTS_FAIL,
  CLEAR_ERRORS,
} from "../constants/tentConstants";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

// Get All Tents
export const getTents = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/tents`);

    dispatch({
      type: ALL_TENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_TENTS_FAIL,
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
