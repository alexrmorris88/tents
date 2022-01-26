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
        width: '100vw', 
        height: '30%', 
        WebkitBackgroundSize: 'cover', 
        maxWidth: '100vw',
      }}
    >
      <Image 
        src={'/home/hero/heroImage.jpg'}
        alt={'SJ Tents'}
        width='100vw'
        height='30%' 
        layout="responsive"
        objectFit="cover"
      />

    </Grid>
  );
};
