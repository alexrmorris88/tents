// Next-React Imports
import React, { useState, useEffect } from "react";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { newReview, clearErrors } from "../../state/actions/tentsAction";
import { NEW_REVIEW_RESET } from "../../state/constants/tentConstants";
// UI Imports
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { FormHelperText, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Utils Imports
import { toast } from "react-toastify";

const ReviewText = styled(Typography)(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const ListReviews = ({ reviews }) => {
  const { rentals } = useSelector((state) => state.userRentals);

  return (
    <>
      <Grid sx={{ mt: 2 }}>
        <Typography color="primary" variant="overline" display="block">
          Rating:
        </Typography>
      </Grid>
      {reviews &&
        reviews.map((review) => (
          <>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <Avatar
                src={""}
                sx={{
                  height: 45,
                  m: 1,
                  width: 45,
                }}
              ></Avatar>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "block",
                  overflow: "hidden",
                }}
              >
                <Rating readOnly value={5} />
                <FormHelperText>
                  {`by ${review.firstName} ${review.lastName}`}
                </FormHelperText>
              </Grid>
            </Grid>

            <ReviewText>{review.comment}</ReviewText>

            {reviews.length > 1 ? <Divider /> : <></>}
          </>
        ))}
    </>
  );
};

export default ListReviews;
