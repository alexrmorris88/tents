import {
  ALL_TENTS_SUCCESS,
  ALL_TENTS_FAIL,
  TENTS_DETAILS_REQUEST,
  TENTS_DETAILS_SUCCESS,
  TENTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
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

// New Tent - ADMIN
export const newTentAdmin = (tentData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_TENTS_A_REQUEST,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/admin/tents/new`, tentData, config);

    dispatch({
      type: NEW_TENTS_A_SUCCESS,
      payload: data.tent,
    });
  } catch (error) {
    dispatch({
      type: NEW_TENTS_A_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Tent - ADMIN
export const updateTentAdmin = (tentID, tentData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TENTS_A_REQUEST,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/tents/${tentID}`,
      tentData,
      config
    );

    dispatch({
      type: UPDATE_TENTS_A_SUCCESS,
      payload: data.tent,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TENTS_A_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Tent - ADMIN
export const deleteTentAdmin = (tentID) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TENTS_A_REQUEST,
    });

    const { data } = await axios.delete(`/api/admin/tents/${tentID}`);

    dispatch({
      type: DELETE_TENTS_A_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TENTS_A_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Tents - ADMIN
export const getAllTentsAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TENTS_A_REQUEST,
    });

    const { data } = await axios.get(`/api/admin/tents`);

    dispatch({
      type: GET_TENTS_A_SUCCESS,
      payload: data.tents,
    });
  } catch (error) {
    dispatch({
      type: GET_TENTS_A_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Tent Details
export const getTentDetails = (req, id) => async (dispatch) => {
  try {
    dispatch({
      type: TENTS_DETAILS_REQUEST,
    });

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

// Get Review
export const getReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/reviews/${id}`);

    dispatch({
      type: GET_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_FAIL,
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
