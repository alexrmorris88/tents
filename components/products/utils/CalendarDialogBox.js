import React from 'react';
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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
// Utils Imports
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import Loader from "../../../components/layout/Loader";

const CalendarDialogBox = (props) => {
  const { open, handleClose, available, rentalDays, clearDates, excludedDates, RentalStartDate, RentalEndDate, onChange, user, ...other } = props;
  return( 
  <>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth
            {...other}
          >
            <DialogTitle id="date-picker">
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
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ width: "100%" }}
                    >
                      {available === true &&
                        RentalStartDate &&
                        RentalEndDate && (
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
                      {available === false &&
                        RentalStartDate &&
                        RentalEndDate && (
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
                      {available &&
                        !user &&
                        RentalStartDate &&
                        RentalEndDate && (
                          <FormHelperText error>
                            Login to reserve your tent.
                          </FormHelperText>
                        )}
                    </Grid>
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
  </>);
};

CalendarDialogBox.propTypes ={
  open: PropTypes.bool,
  available: PropTypes.bool,
  rentalDays: PropTypes.number,
  excludedDates: PropTypes.array,
  RentalStartDate: PropTypes.object,
  RentalEndDate: PropTypes.object,
  user: PropTypes.object,
  onChange: PropTypes.func,
  handleClose: PropTypes.func,
  clearDates: PropTypes.func,
}


export default CalendarDialogBox;
