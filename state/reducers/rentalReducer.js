import {
  CHECK_RENTAL_REQUEST,
  CHECK_RENTAL_SUCCESS,
  CHECK_RENTAL_FAIL,
  CHECK_RENTAL_RESET,
  CALENDAR_AVAILABILITY_SUCCESS,
  CALENDAR_AVAILABILITY_FAIL,
  USER_RENTALS_REQUEST,
  USER_RENTALS_SUCCESS,
  USER_RENTALS_FAIL,
  CLEAR_ERRORS,
} from "../constants/rentalConstants";

// Check Rentals
export const checkRentalReducer = (state = { available: null }, action) => {
  switch (action.type) {
    case CHECK_RENTAL_REQUEST:
      return {
        loading: true,
      };

    case CHECK_RENTAL_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };

    case CHECK_RENTAL_RESET:
      return {
        loading: false,
        available: null,
      };

    case CHECK_RENTAL_FAIL:
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

// Calendar Availability
export const calendarAvailabilityReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case CALENDAR_AVAILABILITY_SUCCESS:
      return {
        loading: false,
        dates: action.payload,
      };

    case CALENDAR_AVAILABILITY_FAIL:
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

// User Rentals
export const userRentalsReducer = (state = { rentals: [] }, action) => {
  switch (action.type) {
    case USER_RENTALS_REQUEST:
      return {
        loading: true,
      };

    case USER_RENTALS_SUCCESS:
      return {
        loading: false,
        rentals: action.payload,
      };

    case USER_RENTALS_FAIL:
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
