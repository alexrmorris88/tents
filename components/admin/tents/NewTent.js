// Next-React Imports
import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
// UI Imports
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
// Component Imports
import { ProductCreateForm } from "./product-create-form";

const ProductCreate = () => {
  return (
    <>
      <Head>
        <title>New Tent</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Create a new tent</Typography>
            <Breadcrumbs separator="/" sx={{ mt: 1 }}>
              <NextLink href="/dashboard" passHref>
                <Link variant="subtitle2">Dashboard</Link>
              </NextLink>
              <NextLink href="/admin/tents" passHref>
                <Link color="primary" variant="subtitle2">
                  Products
                </Link>
              </NextLink>
              <Typography color="textSecondary" variant="subtitle2">
                New
              </Typography>
            </Breadcrumbs>
          </Box>
          <ProductCreateForm />
        </Container>
      </Box>
    </>
  );
};
export default ProductCreate;
