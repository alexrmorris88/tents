import React from 'react'
// Component Imports
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
    <Grid>

      {reviews && reviews.length > 0 ? (
        <ListReviews reviews={reviews} user={user} id={id} />
      ) : ( 
        <></>   
      )}
    </Grid>
  </>

  )
}

export default ReviewsComponent
