import {
  ALL_TENTS_SUCCESS,
  ALL_TENTS_FAIL,
  TENTS_DETAILS_SUCCESS,
  TENTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/tentConstants";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

// Get All Tents
export const getTents =
  (req, page = 1) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      const link = `${origin}/api/tents?page=${page}`;
      const { data } = await axios.get(`${link}`);

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

// New Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/reviews", reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
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
