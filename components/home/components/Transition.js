import React from 'react';
// UI Components
import { Box } from '@mui/material'

const Transition = ({ RemoveNavRef, Scroll }) => {
  return (
  <Box
    ref={RemoveNavRef}
    onScroll={Scroll.scrollOne}
    sx={{ 
      display: 'block'
    }}
  >

  </Box>

  <Box
  ref={RemoveNavRef}
  onScroll={Scroll.scrollOne}
  sx={{ 
    display: 'none'
  }}
  >

  </Box>
  );
};

export default Transition;
