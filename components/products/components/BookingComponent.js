// Next-React Imports
import React, { forwardRef, useState } from "react";
// UI Imports
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
// Icon Imports
import { ChevronDown } from "../../../icons/chevron-down";
import { Star } from "../../../icons/star";
// Utils Imports
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import { borderRadius } from "@mui/system";

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
    reviews,
    rentalDays,
    StartDateInput,
    EndDateInput,
    clearDates,
    ...other
  } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const lineItems = [
    {
      item: "$1,000 x 3 Nights",
      price: "$3,000",
    },
    {
      item: "Setup Fee",
      price: "$500",
    },
    {
      item: "Delivery Fee",
      price: "$25",
    },
  ];

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
            <Typography variant="h5" component={"body"} display="inline">
              ${price}
            </Typography>
            <Typography variant="body1" component={"body"} display="inline">
              {" /day"}
            </Typography>
          </Box>
          <Box sx={{ order: 2, mr: 3, display: "flex" }}>
            <Star color="primary" />
            <Typography variant="body1" component={"body"} display="inline">
              5 - 2 Reviews
            </Typography>
          </Box>
        </Grid>

        <Grid
          sx={{
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
              inputProps={{ style: { fontSize: "0.875rem" } }}
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
              inputProps={{ style: { fontSize: "0.875rem" } }}
              sx={{ ml: 0.15 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth
          >
            <DialogTitle id="alert-dialog-title">
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid>
                  <Box
                    sx={{
                      mt: 2,
                      ml: 4,
                      order: 1,
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    {rentalDays < 1 ? (
                      <Typography variant="subtitle1">
                        Select Rental Dates
                      </Typography>
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
                    <Typography
                      variant="body1"
                      component={"body"}
                      display="inline"
                    >
                      <Button onClick={clearDates}>Clear Dates</Button>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <>
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
                      excludeDates={excludedDates}
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

                    {available === false &&
                      RentalStartDate &&
                      RentalEndDate && (
                        <FormHelperText error>
                          Tent not available, please try different dates.
                        </FormHelperText>
                      )}

                    {available && !user && RentalStartDate && RentalEndDate && (
                      <FormHelperText error>
                        Login to reserve your tent.
                      </FormHelperText>
                    )}
                  </Grid>
                </>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Box sx={{ mr: 6, mb: 1 }}>
                <Button onClick={handleClose}>Close</Button>
              </Box>
            </DialogActions>
          </Dialog>

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
            <ServicesButton>
              <Box sx={{ flexGrow: 1, order: 1, display: "flex" }}>
                <Typography
                  variant="subtitle2"
                  align={"left"}
                  sx={{ fontSize: "0.875rem", m: 0.3, color: "text.primary" }}
                >
                  Services
                </Typography>
              </Box>
              <Box sx={{ order: 2, display: "flex" }}>
                <ChevronDown color="action" />
              </Box>
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
          {available === true && RentalStartDate && RentalEndDate &&  (
            <FormHelperText sx={{ color: "green" }}>
              Tent is available. Reserve now.
            </FormHelperText>
          )}

          {available === false && RentalStartDate && RentalEndDate &&  (
            <FormHelperText error>
              Tent not available, please try different dates.
            </FormHelperText>
          )}

          {available && !user && RentalStartDate && RentalEndDate &&  (
            <FormHelperText error>Login to reserve your tent.</FormHelperText>
          )}
        </Grid>

        <Grid sx={{ m: 1, mb: 2 }}>
          <Typography variant="body1" component={"body"} align={"center"}>
            You won't be charged yet
          </Typography>
        </Grid>

        <Grid sx={{ ml: 4, mr: 4, mb: 1 }}>
          {lineItems.map((item) => (
            <>
              <Grid
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Typography variant="body1" component={"body"}>
                  {item.item}
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
                  {item.price}
                </Typography>
              </Grid>
            </>
          ))}

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
