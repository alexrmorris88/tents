// Next-React Imports
import React, { useEffect, useState, useRef, createRef, useLayoutEffect, useContext } from 'react';
import { useSession } from "next-auth/client";
// Context Imports
import { useCalendar } from '../../../contexts/calendar-context'
// UI Imports
import {
  Box,
  Typography,
  Button
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
// Components Import
import { ServicesPopover } from '../../products/utils/ServicesPopover';
import CalendarDialogBox from "../../../components/products/utils/CalendarDialogBox";
// Icon Imports
import { Search } from '../../../icons/search'
import { ChevronDown } from "../../../icons/chevron-down";
import { ChevronUp } from "../../../icons/chevron-up";

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
  color: '#fff',
});


const ServicesButton = styled(Button)({
  variant: "text",
  width: "100%",
  borderRadius: 0,
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: "text.primary",
  },
});

const NavPopdown = (props) => {
  const {
    RemoveNavRef, 
    eventListner } = props;

  const user = useSession();

  const { 
    StartDate,
    EndDate,
    StartDate_Input, 
    EndDate_Input,
    handleOpenPopover,
    handleClosePopover,
    handleClickOpen,
    handleClose,
    RentalDays,
    Open,
    openPopover,
    ChangeImage,
    available,
    excludedDates,
    clearDatedCalendarComponent,
    onChangeCalendarComponent,
  } = useCalendar()
  const [RentalStartDate, setRentalStartDate] = StartDate;
  const [RentalEndDate, setRentalEndDate] = EndDate;
  const [StartDateInput, setStartDateInput] = StartDate_Input;
  const [EndDateInput, setEndDateInput] = EndDate_Input;
  const [rentalDays, setRentalDays] = RentalDays;
  const [open, setOpen] = Open;

  const anchorRef = useRef(null);
  const [SetupFee, setSetupFee] = useState(false)
  const [DeliveryFee, setDeliveryFee] = useState(false)


  return (

    <Box
      ref={RemoveNavRef}
      addEventListener={eventListner}
      sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mb: 1,
        height: { xs: 50, sm: 60, md: 60, lg: 60, xl: 60 },
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
            handleClickOpen()
          }}
          sx={{ 
            display: 'flex', 
            justifyContent: "center",
            flexDirection: 'column',
            pl: 1, pr: 2,
            width: 0.5
          }}>
        
          <Box sx={{ ml: 2, display: 'flex' }}>
              <Typography variant='subtitle2' sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.7rem', lg: '0.7rem', xl: '0.7rem', } }}>
                Rental Start
              </Typography>
          </Box>


          <Box sx={{ ml: 2, display: 'flex' }}>
            <Typography variant='subtitle2' sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.7rem', lg: '0.7rem', xl: '0.7rem', }, color: 'text.secondary' }}>
                
                {StartDateInput}
            </Typography>
          </Box>

        </StyledBox>


        <Box sx={{ borderRight: 1, borderColor: 'divider'}} ></Box>


          <StyledBox 
            onClick={() => {
              handleClickOpen()
            }}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexDirection: 'column', 
              pl: 1, pr: 2,
              width: 0.5
            }}>

            <Box sx={{ ml: 2, display: 'flex', alignContent: 'center'}}>
              <Typography variant='subtitle2' sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.7rem', lg: '0.7rem', xl: '0.7rem', } }}>
                Rental End
              </Typography>
            </Box>

            <Box sx={{ ml: 2, display: 'flex',   alignContent: 'center' }}>
              <Typography variant='subtitle2' sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.7rem', lg: '0.7rem', xl: '0.7rem', }, color: 'text.secondary' }}>
                  {EndDateInput}
              </Typography>
            </Box>
          </StyledBox>


          <Box sx={{ borderRight: 1, borderColor: 'divider' }} ></Box>


        <StyledBox 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between',
            pl: 2,
            width: 1
            }}>

            <Box 
              onClick={handleOpenPopover} 
              ref={anchorRef} 
              sx={{ 
                display: 'flex', 
                flexDirection:'column',
                justifyContent: 'center', 
                width: 1,
                mr: 1
                }}>
                    <Box  
                      sx={{ 
                      display: 'flex',     
                      flexDirection:'row',
                      justifyContent: 'space-between',
                      }}>

                        <Box sx={{ display: "flex", alignContent: 'center' }}>
                          <Typography variant='subtitle2' sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.7rem', lg: '0.7rem', xl: '0.7rem', } }}>
                            Services
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignContent: 'center' }}>
                          {ChangeImage && ChangeImage ? <ChevronUp color='primary' /> : <ChevronDown color="primary" />}
                        </Box>
                    </Box>

                      <Box sx={{ display: 'flex', alignContent: 'center', mt: -0.6}}>
                        <Typography variant='subtitle2' sx={{ fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.7rem', lg: '0.7rem', xl: '0.7rem', }, color: 'text.secondary' }}>
                          Add Services
                        </Typography>
                      </Box>

                  </Box>

              <ServicesPopover   
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
                setSetupFee={setSetupFee}
                setDeliveryFee={setDeliveryFee}
              />


              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p:1,  mr: 1, backgroundColor: 'primary.main', borderRadius: 16 }}>

                <Box sx={{ display: 'flex', mr: 0.3}}>
                  <Search fontSize="small" style={{ color: "#fff" }} />
                </Box>

                <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                  <WhiteTypography sx={{ fontColor: '#fff'}}>Search</WhiteTypography>
                </Box>

              </Box>

        </StyledBox>
      </Box>
      <CalendarDialogBox 
        open={open} 
        available={available} 
        rentalDays={rentalDays} 
        clearDates={clearDatedCalendarComponent} 
        excludedDates={excludedDates} 
        RentalStartDate={RentalStartDate} 
        RentalEndDate={RentalEndDate}
        user={user}
        onChange={onChangeCalendarComponent}
        handleClose={handleClose} 
        />
    </Box>
  );
};

export default NavPopdown;
