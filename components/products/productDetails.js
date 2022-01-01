// Next-React Imports
import React, { useEffect } from "react";
import Head from "next/head";
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
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
// Component Imports
import Layout from "../layout/Layout";
import Calendar from "../../utils/Calendar";
// Redux Imports
import { clearErrors } from "../../state/actions/tentsAction";
import { useSelector, useDispatch } from "react-redux";

const NextImage = styled(Image)(({ theme }) => ({
  borderRadius: 1,
}));

export default function productDetails() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { tent } = useSelector((state) => state.tentDetails);
  const { name, price, description, images, error } = tent;

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, []);

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
              md={6}
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
              md={6}
              sm={8}
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
              <Grid sx={{ mt: 2, mb: 2, mr: 2 }}>
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="overline">Rental Date</Typography>
                </Grid>
                <Calendar />
              </Grid>
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
