// Next-React Imports
import NextLink from "next/link";
import Image from 'next/image'
// UI Imports
import { Grid, Box, Button, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";


export const HomeHero = (props) => {
  const theme = useTheme();

  return (

    <Grid
      sx={{
        display: 'block', 
        overflow: 'hidden', 
        width: '102vw', 
        height: 'auto', 
        WebkitBackgroundSize: 'cover', 
        marginLeft: '-1vw', 
        marginRight: '-1vw', 
        // marginTop: '-1vh', 
        maxWidth: '102vw',
      }}
    >
      <Image 
        src={'/home/hero/heroImage.jpg'}
        alt={'SJ Tents'}
        width={'100%'}
        height={'70%'}
        layout="responsive"
        objectFit="cover"
      />

    </Grid>
  );
};
