// Next-React Imports
import React, { useEffect, useState, useLayoutEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import Grow from '@mui/material/Grow';
// Component Imports
import CalendarComponent from "../../components/products/components/CalendarComponent";
import ReviewsComponent from "../../components/products/components/ReviewsComponent";
import DescComponent from "../../components/products/components/DescComponent";
import Pictures from "../../components/home_test/components/Pictures";
import NavPopdown from "../home/components/NavPopdown";
import HomeDesc from "./components/HomeDesc";
import { HomeHero } from '../../components/home/components/home-hero';
// Redux Imports
import { clearErrors } from "../../state/actions/tentsAction";
import { useSelector, useDispatch } from "react-redux";
import {
  checkRental,
  getCalendarAvailability,
} from "../../state/actions/rentalActions";
import { getReview, getTentDetails } from "../../state/actions/tentsAction";
import { CHECK_RENTAL_RESET } from "../../state/constants/rentalConstants";
// Utils Imports
import axios from "axios";
import getStripe from "../../utils/getStripe";
import moment from "moment";

const HomeTest = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const id = "61d5cdb574c2761a8c1b3092"

  const description = "This is test text. Do not pay attention to anything that is wirtten here fro now. Currently, this is a place holder for an actual description. The text will start to repeate now. This is test text. Do not pay attention to anything that is wirtten here fro now. Currently, this is a place holder for an actual description. The text will start to repeate now. This is test text. Do not pay attention to anything that is wirtten here fro now. Currently, this is a place holder for an actual description. The text will start to repeate now. "

  const [RentalStartDate, setRentalStartDate] = useState("");
  const [RentalEndDate, setRentalEndDate] = useState("");
  const [StartDateInput, setStartDateInput] = useState("Add Date");
  const [EndDateInput, setEndDateInput] = useState("Add Date");
  const [rentalDays, setRentalDays] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [Fade, setFade] = useState({scrollOne: true})
  const [BoxDisplay, setBoxDisplay] = useState("flex")

  const { available } = useSelector((state) => state.checkRental);
  const { dates } = useSelector((state) => state.calendarAvailability);
  const { reviews, loading: reviewLoading } = useSelector(
    (state) => state.review
  );
  const { user, loading: userLoading } = useSelector(
    (state) => state.loadedUser
  );

  const excludedDates = [];
  if (dates) {
    dates.forEach((date) => {
      excludedDates.push(new Date(date));
    });
  }

  useEffect(() => {
    dispatch(getCalendarAvailability(id));
    dispatch(getReview(id));

    toast.error(reviewLoading || userLoading);
    dispatch(clearErrors());

    return () => {
      dispatch({ type: CHECK_RENTAL_RESET });
    };
  }, [dispatch, id]);

  useLayoutEffect(() => {

    const onScroll = () => {
      const scroll = window.scrollY

      if (scroll > 1) {
        setFade(state => ({ ...state, scrollOne: false }))
        setBoxDisplay("none")
      } if (scroll === 0) {
        setFade(state => ({ ...state, scrollOne: true }))
        setBoxDisplay("flex")
      }
    };
  
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scorll', onScroll)
    }, [])

  const clearDatedCalendarComponent = () => {
    
    setRentalStartDate("");
    setStartDateInput("Add Date");

    setRentalEndDate("");
    setEndDateInput("Add Date");

    setRentalDays(0);
  };

  const onChangeCalendarComponent = (date) => {
    setRentalStartDate("");
    setStartDateInput("Add Date");

    setRentalEndDate("");
    setEndDateInput("Add Date");

    setRentalDays(0);

    let [RentalStartDate, RentalEndDate] = date;

    if (RentalStartDate) {
      setRentalStartDate(RentalStartDate);
      setStartDateInput(moment(RentalStartDate).format("MMM DD, YYYY"));
    }
    if (RentalEndDate) {
      setRentalEndDate(RentalEndDate);
      setEndDateInput(moment(RentalEndDate).format("MMM DD, YYYY"));
    }

    if (RentalStartDate && RentalEndDate) {
      // Calclate days of stay

      const days = Math.floor(
        (new Date(RentalEndDate) - new Date(RentalStartDate)) / 86400000 + 1
      );

      setRentalDays(days);

      dispatch(
        checkRental(
          id,
          RentalStartDate.toISOString(),
          RentalEndDate.toISOString()
        )
      );
    }
  };

  const rentTent = async (id, amount) => {
    setPaymentLoading(true);

    try {
      const link = `/api/checkout_session/${id}?rentalPickupDate=${RentalStartDate.toISOString()}&rentalDroptDate=${RentalEndDate.toISOString()}`;

      const { data } = await axios.get(link, { params: { amount } });

      const stripe = await getStripe();

      // Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.session.id });

      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);

      toast.error(error.message);
    }
  };


  return (
    <main>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgb(255,255,255)',
              background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(121,122,214,1) 50%, rgba(121,122,214,1) 100%)',
              pb: 5
            }}
          >         
              <Box
                sx={{
                  pt: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                  <Grow 
                    in={Fade.scrollOne}
                    style={{ transformOrigin: '100 100 100' }}
                    {...(Fade.scrollOne ? { timeout: { exit: 10, enter: 50 } } : {} )}
                  >
                    <Box>
                    <NavPopdown />
                    </Box>
                  </Grow>
              </Box>
            <Box>
              <HomeHero />
            </Box>
          </Box> 


      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >     
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '95vw', sm: '90vw', md: '80vw', lg: '70vw', xl: '70vw' },

        }}
        >

          <Box>
            <HomeDesc />
          </Box>

          <Box>
            <Divider />
            <Pictures />
          </Box>

          <Box>
            <Divider />
            <DescComponent description={description} />
          </Box>

          <Box>
            <Divider />
            
            <CalendarComponent
              available={available}
              RentalStartDate={RentalStartDate}
              RentalEndDate={RentalEndDate}
              excludeDates={excludedDates}
              onChange={onChangeCalendarComponent}
              setRentalStartDate={setRentalStartDate}
              setRentalEndDate={setRentalEndDate}
              rentalDays={rentalDays}
              user={user}
              clearDates={clearDatedCalendarComponent}
            />
          </Box>  

          <Box>
            <Divider />
            <ReviewsComponent user={user} reviews={reviews} id={id} />
          </Box>
        </Box>
      </Box>
    </main>
  );
}

export default HomeTest;
