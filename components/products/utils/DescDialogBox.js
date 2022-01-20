// Next-React Imports
import * as React from 'react';
// UI Imports
import {
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const DescDialogBox = (props) => {
  const { handleClose, open, description, ...other } = props;
  return <Grid>

<Dialog
open={open}
onClose={handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
{...other}
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


  </Grid>;
};

export default DescDialogBox;
