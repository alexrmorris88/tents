// Next-React Imports
import React from "react";
// UI Imports
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { FormHelperText, Avatar } from "@mui/material";
import Carousel from 'react-material-ui-carousel'

const ReviewText = styled(Typography)(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const ListReviews = ({ reviews }) => {
  return (
    <>
      <Grid sx={{ mt: 2 }}>
        <Typography color="primary" variant="overline" display="block">
          Rating:
        </Typography>
        <Grid 
  container 
  justifyContent="flex-end"
    sx={{
      display: 'inline-flex',
      flexDirection: 'row',
      mt: -15,
      p: 0
      }}
  >
        { user ? (
          <NewReview reviewID={id} />
          ) : (
            <></>
          )}
  </Grid>
      </Grid>
      <Carousel

      >
      {reviews &&
        reviews.map((review) => (
          <>
          
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
                overflow: "hidden",
                mt: 1,
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
                <Rating readOnly value={review.rating} />
                <FormHelperText>
                  {`by ${review.firstName} ${review.lastName}`}
                </FormHelperText>
              </Grid>
            </Grid>
            <FormHelperText>comment:</FormHelperText>
            <ReviewText sx={{ ml: 2, mb: 1, p: 0 }}>
              {review.comment}
            </ReviewText>
          </>
        ))}
        </Carousel>
    </>
  );
};

export default ListReviews;
