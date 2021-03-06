import React from "react";
// UI Imports
import { Box, Grid, Typography } from "@mui/material";
// Icon Imports
import { Share } from "../../../icons/share";

const TitleComponent = (props) => {
  const { name, ...other } = props;

  return (
    <>
      <Grid container sx={{ m: 2 }}>
        <Grid>
          <Box
            sx={{
              order: 1,
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography color="text.primary" variant="subtitle2" component="h1" sx={{ fontWeight: 500, fontSize: '2rem' }}>
              {name}
            </Typography>
          </Box>
        </Grid>

        <Grid container sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              order: 2,
            }}
          >
            <Typography
              color="text.secondary"
              variant="subtitle2"
              component="p"
              sx={{ fontWeight: 500, fontSize: '0.8rem' }}
            >
              Some text to support the title!
            </Typography>
          </Box>
          <Box sx={{ order: 3, mr: 3, display: "flex" }}>
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

export default TitleComponent;
