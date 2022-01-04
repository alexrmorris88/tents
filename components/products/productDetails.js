// Next-React Imports
import React, { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// Component Imports
import Layout from "../layout/Layout";
// Redux Imports
import { clearErrors } from "../../state/actions/tentsAction";
import { useSelector, useDispatch } from "react-redux";
// Utils Imports
import axios from "axios";

export default function productDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const [calendarDates, setCalendarDates] = useState([null, null]);
  const [rentalDays, setRentalDays] = useState(0);

  const { tent } = useSelector((state) => state.tentDetails);
  const { name, price, description, images, error } = tent;

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, []);

  const newBookingHandler = async () => {
    const [RentalStartDate, RentalEndDate] = calendarDates;

    const bookingData = {
      tent: router.query.id,
      rentalPickupDate: RentalStartDate,
      rentalDroptDate: RentalEndDate,
      dayOfRental: rentalDays,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/rentals", bookingData, config);
    } catch (error) {
      toast.error(error.response);
    }
  };

  const NextImage = styled(Image)(({ theme }) => ({
    borderRadius: 1,
  }));

  return (
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
          <Grid alignItems="top" container justifyContent="center" spacing={3}>
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

              <Grid sx={{ mb: 1 }}>
                <Typography variant="overline">Rental Date</Typography>
              </Grid>
              {/* Calandar */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  startText="Rental Date Start"
                  endText="Rental Date End"
                  value={calendarDates}
                  onChange={(date) => {
                    setCalendarDates(date);
                    const [RentalStartDate, RentalEndDate] = calendarDates;

                    if (RentalStartDate && RentalEndDate) {
                      const days = Math.floor(
                        (new Date(RentalEndDate) - new Date(RentalStartDate)) /
                          86400000 +
                          1
                      );

                      setRentalDays(days);
                    }
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField
                        variant="outlined"
                        size="small"
                        {...startProps}
                      />
                      <Box sx={{ mx: 2 }}>
                        <Typography variant="overline"> to </Typography>
                      </Box>
                      <TextField
                        variant="outlined"
                        size="small"
                        {...endProps}
                      />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>

              <Grid item mt={3} width={200}>
                <Stack spacing={2} direction="column">
                  <Button
                    variant="contained"
                    color="addToCart"
                    sx={{ boxShadow: 3 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="BuyNow"
                    sx={{ boxShadow: 3 }}
                    onClick={newBookingHandler}
                  >
                    Rent Now
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 2 }}>
          <Divider />
          <Grid sx={{ mt: 2 }}>
            <Typography color="primary" variant="overline" display="block">
              Reviews:
            </Typography>
          </Grid>
          <Rating />
        </Grid>
      </Container>
    </Layout>
  );
}
