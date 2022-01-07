// Next-React Imports
import React, { useEffect, useState, forwardRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FormHelperText } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Calendar } from "../../icons/calendar";
// Component Imports
import Layout from "../layout/Layout";
import NewReview from "../review/NewReview";
// Redux Imports
import { clearErrors } from "../../state/actions/tentsAction";
import { useSelector, useDispatch } from "react-redux";
import {
  checkRental,
  getCalendarAvailability,
} from "../../state/actions/rentalActions";
import { CHECK_RENTAL_RESET } from "../../state/constants/rentalConstants";
// Utils Imports
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getStripe from "../../utils/getStripe";
import Loader from "../../components/layout/Loader";

export default function productDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { id } = router.query;

  const [calendarDates, setCalendarDates] = useState([null, null]);
  const [rentalDays, setRentalDays] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { tent } = useSelector((state) => state.tentDetails);
  const { name, price, description, images, error } = tent;

  const { available } = useSelector((state) => state.checkRental);
  const { dates } = useSelector((state) => state.calendarAvailability);
  const { rentals } = useSelector((state) => state.userRentals);
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

    toast.error(error);
    dispatch(clearErrors());

    return () => {
      dispatch({ type: CHECK_RENTAL_RESET });
    };
  }, [dispatch, id]);

  const onChange = (calendarDates) => {
    const [RentalStartDate, RentalEndDate] = calendarDates;

    setCalendarDates([RentalStartDate, RentalEndDate]);

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

  const newBookingHandler = async () => {
    const [RentalStartDate, RentalEndDate] = calendarDates;

    const bookingData = {
      tent: id,
      rentalPickupDate: RentalStartDate,
      rentalDroptDate: RentalEndDate,
      dayOfRental: rentalDays,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
      paidAt: Date.now(),
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/rentals", bookingData, config);

      if (data) {
        toast.success(`${tent.name} booked!`);
      }
    } catch (error) {
      toast.error(error.response);
    }
  };

  const rentTent = async (id, amount) => {
    const [RentalStartDate, RentalEndDate] = calendarDates;

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

  const NextImage = styled(Image)(({ theme }) => ({
    borderRadius: 1,
  }));

  const CalendarComponent = forwardRef(({ value, onClick }, ref) => (
    <Button
      startIcon={<Calendar />}
      variant="outlined"
      onClick={onClick}
      ref={ref}
    >
      <Typography variant="overline">
        {" "}
        {value ? value : "MM/DD/YYYY - MM/DD/YYYY"}
      </Typography>
    </Button>
  ));

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
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
              <Grid
                alignItems="top"
                container
                justifyContent="center"
                spacing={3}
              >
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  sx={{
                    order: 1,
                  }}
                >
                  <Carousel autoPlay={false} controls={true} indicators={true}>
                    {images &&
                      images.map((image) => {
                        return (
                          <NextImage
                            key={image.url}
                            src={image.url}
                            alt={name}
                            title={name}
                            width="100%"
                            height="65%"
                            layout="responsive"
                            objectFit="contain"
                            className="avatar"
                            priority
                          />
                        );
                      })}
                  </Carousel>
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  sx={{
                    order: 2,
                  }}
                >
                  <Typography color="primary" variant="h1">
                    {name}
                  </Typography>

                  <Typography variant="h3">${price}</Typography>
                  <Typography variant="body1">{description}</Typography>

                  <Grid sx={{ mb: 1, mt: 2 }}>
                    <Typography variant="overline">Rental Date</Typography>
                  </Grid>
                  {/* Calandar */}

                  <DatePicker
                    selectsRange
                    startDate={calendarDates[0]}
                    onChange={onChange}
                    startDate={calendarDates[0]}
                    endDate={calendarDates[1]}
                    minDate={new Date()}
                    excludeDates={excludedDates}
                    withPortal
                    customInput={<CalendarComponent />}
                  />
                  {available === true && (
                    <FormHelperText sx={{ color: "green" }}>
                      Room is available. Book now.
                    </FormHelperText>
                  )}

                  {available === false && (
                    <FormHelperText error>
                      Room not available. Try different dates.
                    </FormHelperText>
                  )}

                  {available && !user && (
                    <FormHelperText error>Login to book room.</FormHelperText>
                  )}

                  <Grid item mt={3} width={200}>
                    <Stack spacing={2} direction="column">
                      <Button
                        variant="contained"
                        color="addToCart"
                        sx={{ boxShadow: 3 }}
                      >
                        Add to Cart
                      </Button>

                      {available && user ? (
                        <Button
                          variant="contained"
                          color="BuyNow"
                          sx={{ boxShadow: 3 }}
                          onClick={() => rentTent(id, price)}
                        >
                          Rent Now
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="BuyNow"
                          sx={{ boxShadow: 3 }}
                          onClick={() => {
                            if (!user && available) {
                              toast.error("Please login");
                            }

                            if (user && !available) {
                              toast.error("Please select different dates");
                            }

                            if (!user && !available) {
                              toast.error(
                                "Please login & select different dates"
                              );
                            }
                          }}
                        >
                          Rent Now
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ p: 1 }}>
              <Divider />
              <NewReview reviewID={id} />
            </Grid>
          </Container>
        </Layout>
      )}
    </>
  );
}
