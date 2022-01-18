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
      <Grid sx={{ m: 1 }}>
      { user ? (
        <NewReview reviewID={id} />
      ) : (
        <></>
      )}
    </Grid>
    <Divider />
    <Grid sx={{ p: 1 }}>
      {reviews && reviews.length > 0 ? (
        <ListReviews reviews={reviews} />
      ) : (
        <></>
      )}
    </Grid>
  </>
  )
}

export default ReviewsComponent
