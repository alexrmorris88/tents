// Next-React Imports
import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
// UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Component Imports
import Layout from "../layout/Layout";
import { palette } from "@mui/system";

export default function productDetails() {
  const { tent } = useSelector((state) => state.tentDetails);
  const { name, price, description, images } = tent;

  return (
    <Layout title="Products">
      <Head>
        <title>{name}</title>
      </Head>

      <Container maxWidth="lg">
        <Grid
          alignItems="top"
          container
          justifyContent="center"
          spacing={3}
          ml={3}
        >
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              order: {
                xs: 1,
                md: 2,
              },
            }}
          >
            <Carousel autoPlay={false} controls={true} indicators={true}>
              {images &&
                images.map((image) => {
                  return (
                    <Image
                      key={image.url}
                      src={image.url}
                      alt={name}
                      title={name}
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
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
            mt={10}
            sx={{
              order: {
                xs: 1,
                md: 2,
              },
            }}
          >
            <Typography color="primary" variant="h1">
              {name}
            </Typography>
            <Typography variant="h3">${price}</Typography>
            <Typography variant="body1">{description}</Typography>
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
                  Buy Now
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Divider />
          <Typography color="primary" variant="overline" display="block">
            Reviews:
          </Typography>
          <Rating />
        </Grid>
      </Container>
    </Layout>
  );
}
