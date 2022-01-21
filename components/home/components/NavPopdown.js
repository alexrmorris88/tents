// Next-React Imports
import React from 'react';
// UI Imports
import {
  Box,
  Typography,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import styled, { ThemeProvider } from 'styled-components';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
// Icon Imports
import { Search } from '../../../icons/search'

const StyledBox = styled(Box)({
  "&:hover": {

    backgroundColor: '#E6E8F0',
    borderColor: "primary.main",
    borderRadius: 16,
    cursor: 'pointer',
    boxShadow: "0px 0px 0px 8px #E6E8F0",
  }
});

const WhiteTypography = styled(Typography)({
  color: '#fff'
});


const NavPopdown = () => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1  }}>

      <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        border: 1, 
        borderColor: 'divider', 
        borderRadius: 16, 
        width: '40vw', 
        p: 1,
         }}
      > 
        <StyledBox 
          onClick={() => {
            console.log("hello")
          }}
          sx={{ 
            ml: 1, 
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
            <Typography variant='subtitle2' sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
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
              <Typography variant='subtitle2' sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                  Add Dates
              </Typography>
            </Box>
          </StyledBox>
        </Box>


        <Box sx={{ display: 'flex', mr: 1 }}>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p:1,  mr: 1, backgroundColor: 'primary.main', borderRadius: 16 }}>
            <Box sx={{ display: 'flex', mr: 0.3}}>
              <Search fontSize="small" style={{ color: "#fff" }} />
            </Box>

            <Box sx={{ display: 'flex'}}>
              <WhiteTypography sx={{ fontColor: '#fff' }}>Search</WhiteTypography>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default NavPopdown;
