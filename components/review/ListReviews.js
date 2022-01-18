// Next-React Imports
import React from "react";
// Component Imports
import NewReview from "../review/NewReview";
// UI Imports
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormHelperText, Avatar } from "@mui/material";
import Carousel from 'react-material-ui-carousel'

const ReviewText = styled(Typography)(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const ListReviews = ({ reviews, user, id }) => {
  return (
    <>
      <Grid container sx={{ mt: 2 }}>
        <Box sx={{ flexGrow: 1, order: 1 }}>
          <Typography color="primary" variant="overline">
            Rating:
          </Typography>
        </Box>
        <Box sx={{ order: 2, mt: -2.5 }}>
          { user ? (
            <NewReview reviewID={id} />
            ) : (
              <></>
            )}
        </Box>
      </Grid>
      <Carousel>
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
