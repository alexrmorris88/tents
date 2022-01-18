import React, { useState } from "react";
// UI Imports
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  FormHelperText,
  Grid,
} from "@mui/material";
// Utils Imports
import DatePicker from "react-datepicker";
// Utils Import
import moment from "moment";

const CalendarComponent = (props) => {
  const {
    excludeDates,
    available,
    RentalStartDate,
    RentalEndDate,
    onChange,
    setRentalStartDate,
    setRentalEndDate,
    rentalDays,
    user,
    ...other
  } = props;

  return (
    <>
      <Grid
        container
        sx={{ mt: 2, mb: 1, ml: 4, display: "flex", flexDirection: "column" }}
      >
        {rentalDays < 1 ? (
          <Typography variant="subtitle1">Select Rental Dates</Typography>
        ) : (
          <Typography variant="subtitle1"> {rentalDays} Day Rental</Typography>
        )}

        {RentalStartDate && RentalEndDate ? (
          <FormHelperText>
            {moment(RentalStartDate).format("MMM DD, YYYY")} -{" "}
            {moment(RentalEndDate).format("MMM DD, YYYY")}
          </FormHelperText>
        ) : (
          <FormHelperText>
            Add your rental dates for exact pricing
          </FormHelperText>
        )}
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <DatePicker
          selected={RentalStartDate}
          onChange={(date) => onChange(date)}
          startDate={RentalStartDate}
          endDate={RentalEndDate}
          monthsShown={2}
          excludeDates={excludeDates}
          selectsRange
          inline
        />
      </Grid>
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        {available === true && (
          <FormHelperText sx={{ color: "green" }}>
            Tent is available. Book now.
          </FormHelperText>
        )}

        {available === false && (
          <FormHelperText error>
            Tent not available. Try different dates.
          </FormHelperText>
        )}

        {available && !user && (
          <FormHelperText error>Login to book tent.</FormHelperText>
        )}
      </Grid>
    </>
  );
};

export default CalendarComponent;
