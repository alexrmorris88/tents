// Next-React Imports
import React, { useRef, useState, useEffect } from "react";
// UI Imports
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  FormHelperText,
  ButtonBase,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
// Component Imports
import { ServicesPopover } from '../utils/ServicesPopover';
import CalendarDialogBox from "../utils/CalendarDialogBox";
// Icon Imports
import { ChevronDown } from "../../../icons/chevron-down";
import { ChevronUp } from "../../../icons/chevron-up";
import { Star } from "../../../icons/star";
// Utils Imports
import PropTypes from "prop-types";

const DateField = styled(TextField)({
  width: "100%",
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: "primary.main",
  },
});

const ServicesButton = styled(Button)({
  variant: "text",
  width: "100%",
  borderRadius: 0,
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: "text.primary",
  },
});

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: "100px",
  },
});

const BookingComponent = (props) => {
  const {
    id,
    price,
    user,
    available,
    RentalStartDate,
    RentalEndDate,
    onChange,
    excludedDates,
    rentTent,
    setRentalStartDate,
    setRentalEndDate,
    rentalDays,
    StartDateInput,
    EndDateInput,
    clearDates,
    reviews,
    ...other
  } = props;
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [open, setOpen] = useState(false);
  const [ChangeImage, setChangeImage] = useState(false)
  const [SetupFee, setSetupFee] = useState(false)
  const [DeliveryFee, setDeliveryFee] = useState(false)


  const handleOpenPopover = () => {
    setOpenPopover(true);
    setChangeImage(true)
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
    setChangeImage(false)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const reviewList = [
    {reviewItem: "Quality", rating: "5"}, {reviewItem: "Communication", rating: "4"}, 
    {reviewItem: "Value", rating: "2.5"}, {reviewItem: "On Time", rating: "3"},
  ]

  const overallRating = (rating) => {
    const [ qualityRating, valueRating, communicationRating, timeRating ] = rating;
    return ((Number(qualityRating.rating) + Number(valueRating.rating) + Number(communicationRating.rating) + Number(timeRating.rating)) / rating.length).toFixed(1)
  }


  return (
    <Card
      className={classes.root}
      elevation={15}
      sx={{ border: 1, borderColor: "divider", m: 1, p: 1, pr: 3 }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          item
          sx={{ justifyContent: "space-between", ml: 2, m: 2 }}
        >
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              order: 1,
            }}
          >
            <Typography variant="h5" component={"body"} >
              ${price}
            </Typography>
            <Typography variant="body1" component={"body"} >
              {" /day"}
            </Typography>
          </Box>
          <Box sx={{ order: 2, mr: 3, mt: 0.5, display: "flex" }}>
            <Star color="primary" style={{ fontSize: 20 }} />
            <Typography variant="body1" component={"body"} sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
            {overallRating(reviewList)} - {reviews && reviews ?  reviews.length : '0'} reviews
            </Typography>
          </Box>
        </Grid>

        <Grid
          sx={{
            mt: 0.5,
            ml: 4,
            mr: 4,
            width: "auto",
            height: "110px",
          }}
        >
          <Grid
            sx={{
              display: "inline-flex",
              width: "50%",
            }}
          >
            <DateField
              value={StartDateInput}
              label="Rental Start"
              onClick={handleClickOpen}
              variant="outlined"
              inputProps={{ style: { fontSize: "0.875rem", fontWeight: 400 } }}
              sx={{ mr: 0.15 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              width: "50%",
            }}
          >
            <DateField
              value={EndDateInput}
              label="Rental End"
              onClick={handleClickOpen}
              variant="outlined"
              inputProps={{ style: { fontSize: "0.875rem", fontWeight: 400  } }}
              sx={{ ml: 0.15 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

            <CalendarDialogBox 
              open={open} 
              available={available} 
              rentalDays={rentalDays} 
              clearDates={clearDates} 
              excludedDates={excludedDates} 
              RentalStartDate={RentalStartDate} 
              RentalEndDate={RentalEndDate}
              user={user}
              onChange={onChange}
              handleClose={handleClose} 
            />

          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              mt: 0.5,    
            }}
          >
            <ServicesButton onClick={handleOpenPopover} ref={anchorRef}>
              <Box sx={{ flexGrow: 1, order: 1, display: "flex" }}>
                <Typography
                  variant="subtitle2"
                  align={"left"}
                  sx={{ fontSize: "0.875rem", m: 0.3, color: "text.primary", fontWeight: 400  }}
                >
                  Services
                </Typography>
              </Box>
              <Box sx={{ order: 2, display: "flex" }}>
                {ChangeImage && ChangeImage ? <ChevronUp color='primary' /> : <ChevronDown color="primary" />}
              </Box>
            </ServicesButton>

            <ServicesPopover   
              anchorEl={anchorRef.current}
              onClose={handleClosePopover}
              open={openPopover}
              setSetupFee={setSetupFee}
              setDeliveryFee={setDeliveryFee}
            />

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
              sx={{ width: "100%", mb: 1 }}
              onClick={() => rentTent(id, price)}
            >
              Reserve
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", mb: 1 }}
              onClick={() => {
                if (!user && available) {
                  toast.error("Please login");
                }

                if (user && !available) {
                  toast.error("Please select different dates");
                }

                if (!user && !available) {
                  toast.error("Please login & select different dates");
                }
              }}
            >
              Reserve
            </Button>
          )}
        </Grid>

        <Grid container justifyContent="center" sx={{ mb: 1 }}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {available === true && RentalStartDate && RentalEndDate && (
              <FormHelperText sx={{ color: "green" }}>
                Tent is available. Reserve now.
              </FormHelperText>
            )}
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {available === false && RentalStartDate && RentalEndDate && (
              <FormHelperText error>
                Tent not available, please try different dates.
              </FormHelperText>
            )}
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {available && !user && RentalStartDate && RentalEndDate && (
              <FormHelperText error>Login to reserve your tent.</FormHelperText>
            )}
          </Grid>
        </Grid>

        <Grid sx={{ m: 1, mb: 2 }}>
          <Typography variant="body1" component={"body"} align={"center"}>
            You won't be charged yet
          </Typography>
        </Grid>

        <Grid sx={{ ml: 4, mr: 4, mb: 1 }}>


              {rentalDays > 0 ?
              <>
              <Grid
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Typography variant="body1" component={"body"}>
                   ${price} X {rentalDays} days
                </Typography>
              </Grid>

              <Grid
                container
                justifyContent="flex-end"
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Typography variant="body1" component={"body"}>
                  ${price*rentalDays}
                </Typography>
              </Grid>
              </> : <></>}


             {SetupFee ? 
             <>
             <Grid
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Typography variant="body1" component={"body"}>
                  Professional Setup
                </Typography>
              </Grid>

              <Grid
                container
                justifyContent="flex-end"
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Typography variant="body1" component={"body"}>
                  $500
                </Typography>
              </Grid>
              </> : <></>}

              {DeliveryFee && 
              <>
              <Grid
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Typography variant="body1" component={"body"}>
                  Delivery
                </Typography>
              </Grid>

              <Grid
                container
                justifyContent="flex-end"
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Typography variant="body1" component={"body"}>
                  $25
                </Typography>
              </Grid>
              </>}


          <Divider />

          <Grid
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              width: "50%",
              mt: 1,
            }}
          >
            <Typography variant="h6" component={"body"}>
              Total
            </Typography>
          </Grid>

          <Grid
            container
            justifyContent="flex-end"
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              width: "50%",
            }}
          >
            <Typography variant="h6" component={"body"}>
              $3,525
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BookingComponent;
