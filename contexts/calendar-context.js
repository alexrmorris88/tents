// Next-React Imports
import React, { createContext, useEffect, useState, useContext } from 'react';
// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import {
  checkRental,
  getCalendarAvailability,
} from "../state/actions/rentalActions";
// Utils Import
import moment from 'moment';
import PropTypes from 'prop-types';

const CalendarContext = React.createContext()

export const CalendarProvider = ({ children }) => {
  const dispatch = useDispatch();
  const id = "61d5cdb574c2761a8c1b3092"

  const [RentalStartDate, setRentalStartDate] = useState("");
  const [RentalEndDate, setRentalEndDate] = useState("");
  const [StartDateInput, setStartDateInput] = useState("Add Date");
  const [EndDateInput, setEndDateInput] = useState("Add Date");

  const [rentalDays, setRentalDays] = useState(0);

  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [ChangeImage, setChangeImage] = useState(false)

  const { available } = useSelector((state) => state.checkRental)
  const { dates } = useSelector((state) => state.calendarAvailability);

  // Handle Popover Open for 'Services Selector' 
  const handleOpenPopover = () => {
    setOpenPopover(true);
    setChangeImage(true)
  };

  // Handle Popover Close for 'Services Selector' 
  const handleClosePopover = () => {
    setOpenPopover(false);
    setChangeImage(false)
  };

  // Handle Open of Calendar Dialog Box
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle Close of Calendar Dialog Box
  const handleClose = () => {
    setOpen(false);
  };

  // Clear Date Component
  const clearDatedCalendarComponent = () => {
    
    setRentalStartDate("");
    setStartDateInput("Add Date");

    setRentalEndDate("");
    setEndDateInput("Add Date");

    setRentalDays(0);
  };

  // On Change Calendar Component
  const onChangeCalendarComponent = (date) => {
    setRentalStartDate("");
    setStartDateInput("Add Date");

    setRentalEndDate("");
    setEndDateInput("Add Date");

    setRentalDays(0);

    let [RentalStartDate, RentalEndDate] = date;

    if (RentalStartDate) {
      setRentalStartDate(RentalStartDate);
      setStartDateInput(moment(RentalStartDate).format("MMM DD, YYYY"));
    }
    if (RentalEndDate) {
      setRentalEndDate(RentalEndDate);
      setEndDateInput(moment(RentalEndDate).format("MMM DD, YYYY"));
    }

    if (RentalStartDate && RentalEndDate) {
      // Calclate days of stay

      const days = Math.floor(
        (new Date(RentalEndDate) - new Date(RentalStartDate)) / 86400000 + 1
      );

      setRentalDays(days);

      dispatch(
        checkRental(
          id,
          RentalStartDate.toISOString(),
          RentalEndDate.toISOString()
        )
      );
    }
  };

  // Exclude Dates
  const excludedDates = [];
  if (dates) {
    dates.forEach((date) => {
      excludedDates.push(new Date(date));
    });
  }


  return (
    <CalendarContext.Provider value={{ 
      StartDate: [RentalStartDate, setRentalStartDate], 
      EndDate: [RentalEndDate, setRentalEndDate],
      StartDate_Input: [StartDateInput, setStartDateInput], 
      EndDate_Input: [EndDateInput, setEndDateInput],
      RentalDays: [rentalDays, setRentalDays],
      Open: [open, setOpen],
      openPopover,
      ChangeImage,
      available,
      excludedDates,
      handleOpenPopover,
      handleClosePopover,
      handleClickOpen,
      handleClose,
      clearDatedCalendarComponent,
      onChangeCalendarComponent,
      }}>
      {children}
    </CalendarContext.Provider>
  )
}

// Context Hooks
export const useCalendar = () => {
  return useContext(CalendarContext)
}
