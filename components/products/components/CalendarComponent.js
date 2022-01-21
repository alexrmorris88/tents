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
      <Grid container sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              order: 1,
              display: "flex",
              flexDirection: "column",
          
            }}
          >
            <Box>


            {rentalDays < 1 ? (
              <Typography variant="subtitle1" sx={{ fontSize: '1.2rem' }} >Select Rental Dates</Typography>
            ) : (
              <Typography variant="subtitle1" sx={{ fontSize: '1.2rem' }} >
                {" "}
                {rentalDays} Day Rental
              </Typography>
            )}
            </Box>




          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              order: 2,
          
            }}
          >

              {RentalStartDate && RentalEndDate ? (
                <Typography
                color="text.secondary"
                variant="subtitle2"
                component="p"
                >
                  {moment(RentalStartDate).format("MMM DD, YYYY")} -{" "}
                  {moment(RentalEndDate).format("MMM DD, YYYY")}
                </Typography>
              ) : (
                
                <Typography
                color="text.secondary"
                variant="subtitle2"
                component="p"
                sx={{ fontSize: '.85rem' }}
              >
                  Add your rental dates for exact pricing
                  </Typography>
              )}
          </Box>
          </Box>
          <Box sx={{ order: 3, mr: 2, mt: 2, display: "flex" }}>
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
        sx={{ mt: 2}}
      >

      <Box
        sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex'} }}
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
      </Box>
      <Box
        sx={{display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none'} }}
      >
        <DatePicker
          selected={RentalStartDate}
          onChange={(date) => onChange(date)}
          startDate={RentalStartDate}
          endDate={RentalEndDate}
          monthsShown={1}
          excludeDates={excludeDates}
          selectsRange
          inline
        />
      </Box>
      </Grid>
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Grid container justifyContent="center">
          {available === true && RentalStartDate && RentalEndDate && (
            <FormHelperText sx={{ color: "green" }}>
              Tent is available. Reserve now.
            </FormHelperText>
          )}
        </Grid>
        <Grid container justifyContent="center">
          {available === false && RentalStartDate && RentalEndDate && (
            <FormHelperText error>
              Tent not available, please try different dates.
            </FormHelperText>
          )}
        </Grid>
        <Grid container justifyContent="center">
          {available && !user && RentalStartDate && RentalEndDate && (
            <FormHelperText error>Login to reserve your tent.</FormHelperText>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CalendarComponent;
