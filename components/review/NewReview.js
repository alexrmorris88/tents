// Next-React Imports
import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { newReview, clearErrors } from "../../state/actions/tentsAction";
import { NEW_REVIEW_RESET } from "../../state/constants/tentConstants";
// UI Imports
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Utils Imports
import { toast } from "react-toastify";

const NewReview = ({ reviewID }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = React.useState(false);

  const { error, success } = useSelector((state) => state.newReview);
  const { user: userData, loading: userLoading } = useSelector(
    (state) => state.loadedUser
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());

      if (success) {
        toast.success("Review Posted");
        dispatch({ type: NEW_REVIEW_RESET });
      }
    }
  }, [dispatch, success, error]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    const reviewData = {
      rating,
      comment,
      tentID: reviewID,
    };
    console.log(reviewData);
    dispatch(newReview(reviewData));
  };

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <Grid sx={{ m: 2 }}>
          <Button variant="outlined" onClick={handleClickOpen}>
            Submit Review
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title">
              {"Submit Your Review:"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid sx={{ mt: 2 }}>
                  <Typography
                    color="primary"
                    variant="overline"
                    display="block"
                  >
                    Rating:
                  </Typography>
                </Grid>
                <Rating
                  value={rating}
                  onChange={(event, newRating) => setRating(newRating)}
                />
                <Grid sx={{ mt: 2 }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    rows={6}
                    fullWidth
                    defaultValue=""
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Submit Review
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </>
  );
};

export default NewReview;
