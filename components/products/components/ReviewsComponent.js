import React from 'react'
// Component Imports
import NewReview from "../../review/NewReview";
import ListReviews from "../../review/ListReviews";
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
  Grid,
  Chip,
} from "@mui/material";

const ReviewsComponent = (props) => {
  const { user, reviews, id, ...other } = props;

  return (


<>
<Grid >


<Grid 
  >
          {reviews && reviews.length > 0 ? (
            <ListReviews reviews={reviews} />
          ) : (
            <></>
          )}
  </Grid>
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



</>

  )
}

export default ReviewsComponent
