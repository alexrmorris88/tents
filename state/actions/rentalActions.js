import {
  CHECK_RENTAL_REQUEST,
  CHECK_RENTAL_SUCCESS,
  CHECK_RENTAL_FAIL,
  CALENDAR_AVAILABILITY_SUCCESS,
  CALENDAR_AVAILABILITY_FAIL,
  USER_RENTALS_SUCCESS,
  USER_RENTALS_FAIL,
  CLEAR_ERRORS,
} from "../constants/rentalConstants";
import axios from "axios";

// Check Rental Dates
export const checkRental =
  (tentId, rentalPickupDate, rentalDroptDate) => async (dispatch) => {
    try {
      dispatch({
        type: CHECK_RENTAL_REQUEST,
      });

      let link = `/api/rentals/check?tentId=${tentId}&rentalPickupDate=${rentalPickupDate}&rentalDroptDate=${rentalDroptDate}`;

      const { data } = await axios.get(link);

      dispatch({
        type: CHECK_RENTAL_SUCCESS,
        payload: data.isAvailable,
      });
    } catch (error) {
      dispatch({
        type: CHECK_RENTAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Check Rental Dates
export const getCalendarAvailability = (tentId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/rentals/check_availability?tentId=${tentId}`
    );

    dispatch({
      type: CALENDAR_AVAILABILITY_SUCCESS,
      payload: data.rentalDates,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_AVAILABILITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User Rentals
export const getUserRentals = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/rentals/user`);

    dispatch({
      type: USER_RENTALS_SUCCESS,
      payload: data.rentals,
    });
  } catch (error) {
    dispatch({
      type: USER_RENTALS_FAIL,
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
