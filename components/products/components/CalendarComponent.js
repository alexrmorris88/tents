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
    clearDates,
    ...other
  } = props;

  return (
    <>
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        <Grid>
          <Box
            sx={{
              order: 1,
              mt: 2,
              ml: 4,
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            {rentalDays < 1 ? (
              <Typography variant="subtitle1">Select Rental Dates</Typography>
            ) : (
              <Typography variant="subtitle1">
                {" "}
                {rentalDays} Day Rental
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid container sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              ml: 4,
              flexDirection: "row",
              display: "flex",
              order: 2,
            }}
          >
            <Typography
              color="text.secondary"
              variant="subtitle2"
              component="p"
            >
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
            </Typography>
          </Box>
          <Box sx={{ order: 3, mr: 6, display: "flex" }}>
            <Typography variant="body1" component={"body"} display="inline">
              <Button onClick={clearDates}>Clear Dates</Button>
            </Typography>
          </Box>
        </Grid>
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
        {available === true && RentalStartDate && RentalEndDate && (
          <FormHelperText sx={{ color: "green" }}>
            Tent is available. Reserve now.
          </FormHelperText>
        )}

        {available === false && RentalStartDate && RentalEndDate &&  (
          <FormHelperText error>
            Tent not available, please try different dates.
          </FormHelperText>
        )}

        {available && !user && RentalStartDate && RentalEndDate && (
          <FormHelperText error>Login to reserve your tent.</FormHelperText>
        )}
      </Grid>
    </>
  );
};

export default CalendarComponent;
