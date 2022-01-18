// Next-React Imports
import * as React from 'react';
// UI Imports
import {
  Typography,
  Grid,
} from "@mui/material";


const DescComponent = (props) => {
  const { description, ...other } = props

  return (
    <Grid sx={{m: 2}}>
      <Typography variant="overline" component={"h1"} sx={{m: 1}}>Description:</Typography>
      <Typography variant="body1" component={"body"} sx={{m:1, pl: 1}}>{description}</Typography>
    </Grid>
  )
}

export default DescComponent
