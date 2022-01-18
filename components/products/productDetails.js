// Next-React Imports
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
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

export default function productDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { id } = router.query;

  const [RentalStartDate, setRentalStartDate] = useState("");
  const [RentalEndDate, setRentalEndDate] = useState("");
  const [rentalDays, setRentalDays] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { tent } = useSelector((state) => state.tentDetails);
  const {
    name,
    price,
    description,
    images,
    error,
    loading: tentLoading,
  } = tent;

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

    toast.error(error);
    dispatch(clearErrors());

    return () => {
      dispatch({ type: CHECK_RENTAL_RESET });
    };
  }, [dispatch, id]);

  const onChange = (endDate) => {
    setRentalEndDate(endDate);

    if (RentalStartDate && endDate) {
      // Calclate days of stay

      const days = Math.floor(
        (new Date(endDate) - new Date(RentalStartDate)) / 86400000 + 1
      );

      setRentalDays(days);

      dispatch(
        checkRental(id, RentalStartDate.toISOString(), endDate.toISOString())
      );
    }
  };

  const onChangeCalendarComponent = (date) => {
    let [RentalStartDate, RentalEndDate] = date;

    setRentalStartDate(RentalStartDate);
    setRentalEndDate(RentalEndDate);

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
    <>
      <Layout title="Products">
        <Head>
          <title>{name}</title>
        </Head>

        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            mb: 2,
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
                />

                <Divider />

                {reviewLoading && userLoading ? (
                  <Loader />
                ) : (
                  <ReviewsComponent user={user} reviews={reviews} id={id} />
                )}
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
                  onChange={onChange}
                  rentTent={rentTent}
                  setRentalStartDate={setRentalStartDate}
                  setRentalEndDate={setRentalEndDate}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
