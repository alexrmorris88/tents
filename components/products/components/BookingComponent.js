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
      <Typography variant={"subtitle2"}>{value ? value : "Rental Start"}</Typography>
    </DateButton>
  ));

  const CalendarComponentEnd = forwardRef(({ value, onClick }, ref) => (
    <DateButton
      onClick={onClick}
      ref={ref}
    >
      <Typography variant={"subtitle2"}>{value ? value : "Rental End"}</Typography>
    </DateButton>
  ));

  const lineItems = [
    {
      item: '$1,000 x 3 Nights',
      price: '$3,000'
    },
    {
      item: 'Setup Fee',
      price: '$500'
    },
    {
      item: 'Delivery Fee',
      price: '$25'
    }
  ]

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
              selectsStart
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
              selectsEnd
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
            >
              <Box sx={{ flexGrow: 1, order: 1 }}>
                <Typography variant="subtitle2" align={"left"}>
                  Services
                </Typography>
              </Box>
              <Box sx={{ order: 2  }}><ChevronDown /></Box>

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

          {lineItems.map(item => 
          <>
          <Grid 
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                width: '50%',
                }}
            >
              <Typography variant='body1' component={'body'}>
                {item.item}
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
                {item.price}
              </Typography>
            </Grid></>)}


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
