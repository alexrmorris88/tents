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

const ReviewText = styled(Typography)(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const ListReviews = ({ reviews, user, id }) => {


  const reviewList = [
    {reviewItem: "Quality", rating: "5"}, {reviewItem: "Communication", rating: "5"}, 
    {reviewItem: "Value", rating: "5"}, {reviewItem: "On Time", rating: "5"},
  ]

  return (
    <>
      <Grid container sx={{ mt: 2,   }}>
        <Box sx={{ flexGrow: 1, order: 1 }}>
          <Typography color="primary" variant="overline">
            Rating:
          </Typography>
        </Box>
        <Box sx={{ order: 2, mt: -2.5 }}>
          {user ? <NewReview reviewID={id} /> : <></>}
        </Box>
      </Grid>




      <Grid container  sx={{ mt: 2, mb: 2 }} >
        {reviewList &&
          reviewList.map((item) => (
            <>
              <Grid
                item
                key={item.reviewItem}
                xs={6}
                sx={{
                 mt: .5, mb: .5
                }}
              >
<div style={{ width: '100%'}}>
<Box sx={{display: 'flex'}}>
                  <Box sx={{ width: '50%'}}>
                  <Typography varient={"subtitle1"} >
                    {item.reviewItem}
                  </Typography>
                  </Box>                  
                  
                  <Box sx={{width: '50%'}}>
                  <Typography varient={"subtitle1"} >
                    {item.rating}
                  </Typography>
                  </Box>
                  </Box>
</div>

              </Grid>
            </>
          ))}
          </Grid>





      <Grid container sx={{}}>
        {reviews &&
          reviews.map((review) => (
            <>
              <Grid
                item
                key={review.user}
                xs={6}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                  mb: 1,
                }}
              >
                <Avatar
                  src={""}
                  key={review.user}
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
                <Grid
                  item
                  sx={{
                    alignItems: "center",
                    display: "block",
                    overflow: "hidden",
                  }}
                >
              <FormHelperText>comment:</FormHelperText>
              <ReviewText sx={{ ml: 2, mb: 1, p: 0 }}>
                {review.comment}
              </ReviewText>
              </Grid>
              </Grid>
            </>
          ))}
          </Grid>
          </>
  );
};

export default ListReviews;
