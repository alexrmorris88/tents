// Next-React Imports
import * as React from "react";
// UI Imports
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// Utils Imports
import PropTypes from "prop-types";

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
    <Box sx={{ borderRadius: 2, m: 1, width: "100%", height: "auto" }}>
      <ImageList
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 2,
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
