// Next-React Imports
import * as React from "react";
// UI Imports
import { Typography, Grid, Box } from "@mui/material";
// Icon Imports
import { Share } from "../../../icons/share";

const HeaderComponent = (props) => {
  const { title, manufacturer, ...other } = props;

  return (
    <>
      <Grid container sx={{ m: 2 }}>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              order: 1,
            }}
          >
            <Typography variant="h5" component={"h1"}>
              {title} by {manufacturer}
            </Typography>
          </Box>
        </Grid>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              order: 2,
              mr: 3,
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" component={"body"} sx={{ ml: 1 }}>
              {" "}
              1 Tent - 50 - 100 People Capacity
            </Typography>
          </Box>
          <Box sx={{ order: 2, mr: 3, display: "flex" }}>
            <Share color="primary" />
            <Typography variant="body1" component={"body"} display="inline">
              Share
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderComponent;
