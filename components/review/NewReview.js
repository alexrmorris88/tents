// Next-React Imports
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
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
import { styled } from '@mui/material/styles';
// Utils Imports
import { toast } from "react-toastify";
import Loader from "../../components/layout/Loader";


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#797AD6',
  },
  '& .MuiRating-iconHover': {
    color: '#6566B7',
  },
});


const NewReview = ({ reviewID }) => {
  const [session, loading] = useSession();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const { error, success } = useSelector((state) => state.review);
  const { tent, loading: tentLoading } = useSelector(
    (state) => state.tentDetails
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
  };

  const handleClick = () => {
    setOpen(false);

    const reviewData = {
      rating,
      comment,
      tentID: reviewID,
    };
    dispatch(newReview(reviewData));
    window.location.reload()
  };

  return (
    <>
      <Grid sx={{ m: 2 }}>
        <Button variant="text" size="small" onClick={handleClickOpen}>
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
                <Typography color="primary" variant="overline" display="block">
                  Rating:
                </Typography>
              </Grid>
              <StyledRating
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
            <Button variant="outlined" onClick={handleClose} sx={{ p: 1, mr: 2 }}>
              Close
            </Button>
            <Button variant="contained" onClick={handleClick} sx={{ p: 1, mr: 2 }}>
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default NewReview;
