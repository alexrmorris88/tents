// Next-React Imports
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// Redux Imports
import { clearErrors } from "../../state/actions/tentsAction";
import { useSelector, useDispatch } from "react-redux";
// UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import Truncate from "react-truncate";
// Component Imports
import Layout from "../layout/Layout";

export default function ProductCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tents, error } = useSelector((state) => state.allTents);

  const sx_box_layout = {
    m: 1,
    display: "flex",
    height: "33vw",
    flexWrap: "wrap",
    "&:hover": {
      boxShadow: 3,
    },
  };

  const sx_card_layout = { maxWidth: 270 };

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, []);

  const tentHandler = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <Layout title="Products">
      <Head>
        <title>Products</title>
      </Head>
      <Container maxWidth="lg">
        <Grid alignItems="center" container justifyContent="center">
          {tents &&
            tents.map((tent) => {
              const { name, description, images, _id } = tent;

              return (
                <Box sx={sx_box_layout} key={_id}>
                  <Card sx={sx_card_layout}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={images[0].url}
                      alt={name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <Truncate lines={3}>{description}</Truncate>
                      </Typography>
                    </CardContent>
                    <Grid ml={3}>
                      <Rating disabled />
                    </Grid>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small" onClick={() => tentHandler(_id)}>
                        {name} Details
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
        </Grid>
      </Container>
    </Layout>
  );
}
