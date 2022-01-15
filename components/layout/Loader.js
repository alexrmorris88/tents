import React from "react";
import Image from "next/image";
import { Grid, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Image src="/loader/loader.svg" width={"20px"} height={"20px"} />
      </Grid>
    </Container>
  );
};

export default Loader;
