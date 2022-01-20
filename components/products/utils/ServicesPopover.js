import PropTypes from 'prop-types';
import { Grid,   Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

export const ServicesPopover = (props) => {
  const { anchorEl, onClose, open, setSetupFee, setDeliveryFee, ...other } = props;


  const deliveryHandler = () => {
    setDeliveryFee(true)
  } 

  const setupHandler = () => {
    setSetupFee(true)
  } 

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 285 } }}
      transitionDuration={2}
      {...other}>
      <Grid 
        sx={{ mb: 1, mt: 1 }}>

        <MenuItem>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> 

          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, mb: 1 }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row'}} >
             <Typography                
              variant="subtitle1" 
              sx={{ fontWeight: 700, fontSize: '0.75rem', mr: 1, mt: 0.5 }}>
              Add:
             </Typography>
             <Typography 
               variant="subtitle1" 
              sx={{ fontWeight: 600 }}
             >
               Delivery
             </Typography></Box>
             
             <Typography 
               variant="subtitle2" 
               sx={{ fontSize: '0.8rem', color: "text.primary" }}
             >
               Get us to deliver your tent!
             </Typography>

            </Box>
            <Box sx={{ display: 'flex' }}>
             <Checkbox onChange={deliveryHandler} />
            </Box>
          </Box>    

        </Box>

        </MenuItem>



        <MenuItem>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> 

          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, mb: 1 }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row'}} >
             <Typography                
              variant="subtitle1" 
              sx={{ fontWeight: 700, fontSize: '0.75rem', mr: 1, mt: 0.5 }}>
              Add:
             </Typography>
             <Typography 
               variant="subtitle1" 
              sx={{ fontWeight: 600 }}
             >
               Professional Setup
             </Typography></Box>
             
             <Typography 
               variant="subtitle2" 
               sx={{ fontSize: '0.8rem', color: "text.primary" }}
             >
               Get us to setup your tent!
             </Typography>

            </Box>
            <Box sx={{ display: 'flex' }}>
             <Checkbox onChange={setupHandler} />
            </Box>
          </Box>    

        </Box>

        </MenuItem>

     </Grid>
    </Popover>
  );
};

ServicesPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  setSetupFee: PropTypes.func,
  setDeliveryFee: PropTypes.func,
};
