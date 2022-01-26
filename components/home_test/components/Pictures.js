// Next-React Imports
import * as React from "react";
// UI Imports
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// Utils Imports
import PropTypes from "prop-types";
import { Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PictureComponent() {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >

    <Box>
        <Typography color="text.primary" variant="subtitle2" component="h1" sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
          Inspiration
        </Typography>
      </Box>
    <Box
    sx={{
      display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block',  }
    }}
    >

      <Box sx={{ m: 1, width: "100%", height: "auto" }}>
        <ImageList
          sx={{
            width: "100%",
            height: "auto",
            p: 0,
            m: 0,
            b: 0,
          }}
          variant="quilted"
          cols={4}
          rowHeight={160}
          gap={10}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1.5}
            >
              <img
                {...srcset(item.img, 200, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>


    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none',  }
    }}
    >
      <Carousel>
        {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1.5}
              >
                <img
                  {...srcset(item.img, 200, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
      </Carousel>
      
    </Box>
    </Box>
  );
}

const itemData = [
  {
    img: "../../../tents/wedding_tent_1.jpg",
    title: "Port City Tent Rentals",
    rows: 3,
    cols: 2,
  },
  {
    img: "../../../tents/wedding_tent_2.jpg",
    title: "Port City Tent Rentals",
  },
  {
    img: "../../../tents/wedding_tent_4.jpg",
    title: "Port City Tent Rentals",
  },
  {
    img: "../../../tents/wedding_tent_5.jpg",
    title: "Port City Tent Rentals",
  },
  {
    img: "../../../tents/wedding_tent_3.jpg",
    title: "Port City Tent Rentals",
  },
];
