// Next-React Imports
import React, { useEffect, useState, useRef, createRef, useLayoutEffect } from 'react';
// UI Imports
import {
  Box,
  Typography,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
// Icon Imports
import { Search } from '../../../icons/search'

const StyledBox = styled(Box)({
  "&:hover": {
    backgroundColor: '#E6E8F0',
    borderColor: "primary.main",
    borderRadius: 16,
    cursor: 'pointer',
    boxShadow: "0px 0px 0px 9px #E6E8F0",
  }
});


const WhiteTypography = styled(Typography)({
  color: '#fff'
});


const NavPopdown = ({ RemoveNavRef, eventListner }) => {

  return (

    <Box
      ref={RemoveNavRef}
      addEventListener={eventListner}
      sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mb: 1,
        height: 66,
        }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          border: 1, 
          borderColor: 'divider', 
          borderRadius: 16, 
          backgroundColor: "#fff",
          width: { xs: '70vw', sm: '60vw', md: '50vw', lg: '40vw', xl: '30vw' }, 
          p: 1,
          }}
        > 
        <StyledBox 
          onClick={() => {
            console.log("hello")
          }}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexDirection: 'column', 
            flexGrow: 1 ,  
            borderRight: 1,
            borderColor: 'divider',
            width: 1
          }}>
        
          <Box sx={{ ml: 2, display: 'flex', alignContent: 'center' }}>
              <Typography variant='subtitle2' sx={{ fontSize: '0.7rem' }}>
                Rental Start
              </Typography>
          </Box>


          <Box sx={{ ml: 2, display: 'flex',   alignContent: 'center' }}>
            <Typography variant='subtitle2' sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                Add Dates
            </Typography>

          </Box>

        </StyledBox>


        <Box 
          sx={{ 
            mr: 2, 
            ml: 2, 
            display: 'flex', 
            justifyContent: 'center', 
            flexGrow: 1,  
            borderColor: 'divider',
            width: 1
          }}>

          <StyledBox 
            onClick={() => {
              console.log("hi")
            }}
            sx={{ 
              ml: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              flexDirection: 'column', 
              flexGrow: 1 ,  
              borderRight: 1, 
              borderColor: 'divider',
              
            }}>

            <Box sx={{ ml: 2, display: 'flex', alignContent: 'center'}}>
              <Typography variant='subtitle2' sx={{ fontSize: '0.7rem' }}>
                Rental Start
              </Typography>
            </Box>

            <Box sx={{ ml: 2, display: 'flex',   alignContent: 'center' }}>
              <Typography variant='subtitle2' sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                  Add Dates
              </Typography>
            </Box>
          </StyledBox>
        </Box>


        <StyledBox sx={{ display: 'flex' }}>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p:1,  mr: 1, backgroundColor: 'primary.main', borderRadius: 16 }}>
            <Box sx={{ display: 'flex', mr: 0.3}}>
              <Search fontSize="small" style={{ color: "#fff" }} />
            </Box>

            <Box sx={{ display: 'flex'}}>
              <WhiteTypography sx={{ fontColor: '#fff' }}>Search</WhiteTypography>
            </Box>
          </Box>

        </StyledBox>
      </Box>
    </Box>
  );
};

export default NavPopdown;
