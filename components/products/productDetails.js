// Next-React Imports
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// Context Imports
import { useCalendar } from '../../contexts/calendar-context'
// UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
// Component Imports
import Layout from "../layout/Layout";
import PictureComponent from "./components/PictureComponent";
import TitleComponent from "./components/TitleComponent";
import BookingComponent from "./components/BookingComponent";
import ReviewsComponent from "./components/ReviewsComponent";
import DescComponent from "./components/DescComponent";
import FeaturesComponent from "./components/FeaturesComponent";
import HeaderComponent from "./components/HeaderComponent";
import CalendarComponent from "./components/CalendarComponent";
// Redux Imports
import { clearErrors } from "../../state/actions/tentsAction";
import { useSelector, useDispatch } from "react-redux";
import {
  checkRental,
  getCalendarAvailability,
} from "../../state/actions/rentalActions";
import { getReview } from "../../state/actions/tentsAction";
import { CHECK_RENTAL_RESET } from "../../state/constants/rentalConstants";
// Utils Imports
import axios from "axios";
import getStripe from "../../utils/getStripe";
import Loader from "../../components/layout/Loader";
import moment from "moment";

export default function productDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { id } = router.query;

  const { 
    StartDate, 
    EndDate,
    StartDate_Input,
    EndDate_Input,
    RentalDays,
    excludedDates,
    clearDatedCalendarComponent,
    onChangeCalendarComponent
  } = useCalendar()
  const [RentalStartDate, setRentalStartDate] = StartDate;
  const [RentalEndDate, setRentalEndDate] = EndDate;
  const [StartDateInput, setStartDateInput] = StartDate_Input;
  const [EndDateInput, setEndDateInput] = EndDate_Input;
  const [rentalDays, setRentalDays] = RentalDays;
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { tent = {} } = useSelector((state) => state.tentDetails);
  const {
    name,
    price,
    description,
    images,
    error,
    loading: tentLoading,
  } = tent;

  const { available } = useSelector((state) => state.checkRental);
  const { reviews, loading: reviewLoading } = useSelector(
    (state) => state.review
  );
  const { user, loading: userLoading } = useSelector(
    (state) => state.loadedUser
  );


  useEffect(() => {
    dispatch(getCalendarAvailability(id));
    dispatch(getReview(id));

    toast.error(error);
    dispatch(clearErrors());

    return () => {
      dispatch({ type: CHECK_RENTAL_RESET });
    };
  }, [dispatch, id]);



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
    <>
      <Layout title="Products">
        <Head>
          <title>{name}</title>
        </Head>

        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Grid container justifyContent="center" sx={{ p: 3 }}>
            <TitleComponent name={name} />

            <Grid
              alignItems="top"
              container
              justifyContent="center"
              spacing={3}
            >
              {tentLoading ? (
                <Loader />
              ) : (
                <PictureComponent productImages={images} productName={name} />
              )}
              <Grid
                item
                lg={8}
                md={8}
                sm={12}
                xs={12}
                sx={{
                  order: 1,
                }}
              >
                <HeaderComponent title={name} manufacturer={"XYZ Tents"} />

                <Divider />

                <FeaturesComponent />

                <Divider />

                <DescComponent description={description} />

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
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                sm={12}
                xs={12}
                sx={{
                  order: 2,
                }}
              >

                <BookingComponent
                  id={id}
                  price={price}
                  user={user}
                  available={available}
                  RentalStartDate={RentalStartDate}
                  RentalEndDate={RentalEndDate}
                  reviews={reviews}
                  excludedDates={excludedDates}
                  rentalDays={rentalDays}
                  StartDateInput={StartDateInput}
                  EndDateInput={EndDateInput}
                  onChange={onChangeCalendarComponent}
                  rentTent={rentTent}
                  setRentalStartDate={setRentalStartDate}
                  setRentalEndDate={setRentalEndDate}
                  clearDates={clearDatedCalendarComponent}
                />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  order: 3,
                }}
              >
               <Divider />


                  <ReviewsComponent user={user} reviews={reviews} id={id} />

              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
