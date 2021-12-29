import {
  ALL_TENTS_SUCCESS,
  ALL_TENTS_FAIL,
  TENTS_DETAILS_SUCCESS,
  TENTS_DETAILS_FAIL,
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

// Get Tent Details
export const getTentDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/tents/${id}`);

    dispatch({
      type: TENTS_DETAILS_SUCCESS,
      payload: data.tent,
    });
  } catch (error) {
    dispatch({
      type: TENTS_DETAILS_FAIL,
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