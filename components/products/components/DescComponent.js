// Next-React Imports
import * as React from 'react';
// UI Imports
import {
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical"
  }
});

const DescComponent = (props) => {
  const { description, ...other } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid sx={{m: 2}}>
      <Box sx={{ display:'flex', flexDirection: "column" }}>
        <Box>
        <Typography className={classes.multiLineEllipsis} variant="body1" component={"body"} sx={{m:1, pl: 1 }} >{description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
          <Button onClick={handleClickOpen}>
            Read More
          </Button>
        </Box>
      </Box>


<Dialog
open={open}
onClose={handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"

>
<DialogTitle id="date-picker">
  <Grid
    container
    sx={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Grid>
      <Box
        sx={{
          mt: 2,
          order: 1,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >

<Typography variant="subtitle1" sx={{ fontSize: '1.2rem', fontWeight: 600 }} >
            Rental Information
          </Typography>

      </Box>
    </Grid>
  </Grid>
</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
  <Typography variant="subtitle1" sx={{ color: 'text.primary', fontSize: '0.85rem', fontWeight: 400 }} >{description}</Typography>
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Box sx={{ mr: 6, mb: 1 }}>
    <Button onClick={handleClose}>Close</Button>
  </Box>
</DialogActions>
</Dialog>


</Grid>
  )
}

export default DescComponent
