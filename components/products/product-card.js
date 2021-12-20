// Next-React Imports
import * as React from "react";
import { useRouter } from "next/router";
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
import { useTheme } from "@mui/material/styles";
// Component Imports
import Layout from "../layout/Layout";

const getProducts = (theme) => [
  {
    image: "/tents/large-tent.jpg",
    title: "Large Tent",
    description:
      "Our large tents are perfect for your wedding! Please create an account to book your wedding tent today! Please do not hesitate, tents are booking quickly",
  },
  {
    image: "/tents/medium-tent.jpg",
    title: "Medium Tent",
    description:
      "Our large tents are perfect for your wedding! Please create an account to book your wedding tent today! Please do not hesitate, tents are booking quickly",
  },
  {
    image: "/tents/small-tent.jpg",
    title: "Small Tent",
    description:
      "Our large tents are perfect for your wedding! Please create an account to book your wedding tent today! Please do not hesitate, tents are booking quickly",
  },
];

export default function ProductCard() {
  const router = useRouter();
  const theme = useTheme();
  const products = getProducts(theme.palette.mode);

  const sx_box_layout = {
    m: 1,
    display: "flex",
    flexWrap: "wrap",
    "&:hover": {
      boxShadow: 3,
    },
  };

  const sx_card_layout = { maxWidth: 270 };

  const tentHandler = () => {
    router.push("/");
  };

  return (
    <Layout title="Products">
      <Container maxWidth="lg">
        <Grid alignItems="center" container justifyContent="center">
          {products.map((product) => {
            const { image, title, description } = product;

            return (
              <Box sx={sx_box_layout} key={title}>
                <Card sx={sx_card_layout}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small" onClick={() => tentHandler()}>
                      {title} Details
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
