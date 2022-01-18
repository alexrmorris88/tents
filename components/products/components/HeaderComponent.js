// Next-React Imports
import * as React from 'react';
// UI Imports
import {
  Typography,
  Grid,
} from "@mui/material";


const HeaderComponent = (props) => {
  const { title, manufacturer, ...other } = props

  return (
    <Grid sx={{m: 2}}>
      <Typography variant="h5" component={"h1"} >{title} by {manufacturer}</Typography>
      <Typography variant="body1" component={"body"} sx={{ ml: 1}} > 1 Tent  -  50 - 100 People Capacity</Typography>
    </Grid>
  )
}

export default HeaderComponent
