// Next-React Imports
import React, { useEffect, useState, forwardRef } from "react";
import Image from "next/image";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// UI Imports
import {
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormHelperText,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// Icon Imports
import { Calendar } from "../../../icons/calendar";
import { ChevronDown } from "../../../icons/chevron-down";
// Utils Imports
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

const DateButton = styled(Button)({
  variant: 'text',
  width: '100%',
  borderRadius: 0,
  justifyContent: "flex-start",
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: "primary.main"
  }
});

const ServicesButton = styled(Button)({
  variant: 'text',
  width: '100%',
  borderRadius: 0,
  justifyContent: "flex-start",
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: "primary.main"
  }
});

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: '100px',
  },

});

const BookingComponent = (props) => {
  const { id, price, user, available, RentalStartDate, RentalEndDate, onChange, excludedDates, rentTent, setRentalStartDate, setRentalEndDate, ...other } = props;
  const classes = useStyles();


  const CalendarComponentStart = forwardRef(({ value, onClick }, ref) => (

    <DateButton
      onClick={onClick}
      ref={ref}
    >
      {value ? value : "CHECK-IN"}
    </DateButton>
  ));

  const CalendarComponentEnd = forwardRef(({ value, onClick }, ref) => (
    <DateButton
      onClick={onClick}
      ref={ref}
    >
      {value ? value : "CHECKOUT"}
    </DateButton>
  ));

  return (
    <Card className={classes.root} elevation={15} sx={{ border: 1, borderColor: 'divider', m: 1, p: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}        
      >
        <Grid 
          item
          sx={{ml:2, m: 2}}
        >
          <Typography variant='h5' component={'body'} display="inline">
            ${price}
          </Typography>
          <Typography variant='body1' component={'body'} display="inline">
           {" /day"}
          </Typography>
        </Grid>

        <Grid
          sx={{
            border: 1, 
            borderRadius: 1, 
            borderColor: 'divider',
            ml: 4, 
            mr: 4,
            width: 'auto',
            height: '90px'
          }}   
        >
          <Grid           
            sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            borderRight: 1,
            borderColor: 'divider',
            width: '50%',
            }}
          >


            <DatePicker
              onChange={date => setRentalStartDate(date)}
              selected={RentalStartDate}
              startDate={RentalStartDate}
              endDate={RentalEndDate}
              minDate={new Date()}
              excludeDates={excludedDates}
              withPortal
              customInput={<CalendarComponentStart />}
            />


          </Grid>

          <Grid 
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              width: '50%',
              }}
          >
            <DatePicker
              onChange={date => onChange(date)}
              selected={RentalEndDate}
              startDate={RentalStartDate}
              endDate={RentalEndDate}
              minDate={new Date()}
              excludeDates={excludedDates}
              withPortal
              customInput={<CalendarComponentEnd />}
            />




          </Grid>
          <Grid 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: 1,
              borderColor: 'divider',
              }}
          >
            <ServicesButton
              endIcon={<ChevronDown />}
            >
              <span style={{marginRight: '70%'}}>Services</span>
            </ServicesButton>
          </Grid>

        </Grid>

        <Grid
          sx={{
            ml: 4, 
            mr: 4, 
          }}   
        >

          {available && user ? (
            <Button
              variant="contained"
              color="primary"
              sx={{ width:'100%', mt: 1, mb: 1 }}
              onClick={() => rentTent(id, price)}
            >
              Reserve
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ width:'100%', mt: 1, mb: 1 }}
              onClick={() => {
                if (!user && available) {
                  toast.error("Please login");
                }

                if (user && !available) {
                  toast.error("Please select different dates");
                }

                if (!user && !available) {
                  toast.error(
                    "Please login & select different dates"
                  );
                }
              }}
            >
              Reserve
            </Button>)}

        </Grid>

        <Grid 
        container 
        justifyContent="center"
        sx={{mb: 1}}
        >
        {available === true && (
              <FormHelperText sx={{ color: "green" }} >
                Room is available. Book now.
              </FormHelperText>
            )}

            {available === false && (
              <FormHelperText error >
                Room not available. Try different dates.
              </FormHelperText>
            )}

            {available && !user && (
              <FormHelperText error >Login to book room.</FormHelperText>
            )}
        </Grid>





        <Grid sx={{m: 1, mb: 2 }}>
          <Typography variant='body1' component={'body'} align={"center"}>
            You won't be charged yet
          </Typography>
        </Grid>

        <Grid sx={{ml: 4, mr: 4, mb: 1 }}>

          <Grid 
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='body1' component={'body'}>
                $1,000 X 3 nights
              </Typography>
            </Grid>

            <Grid 
            container 
            justifyContent="flex-end"
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='body1' component={'body'}>
                $3,000
              </Typography>
            </Grid>

            <Grid 
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='body1' component={'body'}>
                Setup Fee
              </Typography>
            </Grid>

            <Grid 
            container 
            justifyContent="flex-end"
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='body1' component={'body'}>
                $500
              </Typography>
            </Grid>

            <Grid 
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='body1' component={'body'}>
                Delivery Fee
              </Typography>
            </Grid>

            <Grid 
            container 
            justifyContent="flex-end"
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='body1' component={'body'}>
                $25
              </Typography>
            </Grid>

            <Divider />

            <Grid 
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='h6' component={'body'}>
                Total
              </Typography>
            </Grid>

            <Grid 
            container 
            justifyContent="flex-end"
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='h6' component={'body'}>
                $3,525
              </Typography>
            </Grid>

        </Grid>

      </Grid>
    </Card>
  )
}

export default BookingComponent
