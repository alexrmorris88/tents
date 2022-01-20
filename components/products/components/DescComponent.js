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
// Component Imports
import DescDialogBox from '../utils/DescDialogBox';


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
      <DescDialogBox handleClose={handleClose} open={open} description={description} />


</Grid>
  )
}

export default DescComponent
