// Next-React Imports
import React, { useEffect, useState, useRef, createRef, useLayoutEffect } from 'react';
// UI Imports
import { Divider, Box } from "@mui/material";
// Component Imports
import { HomeHero } from "./components/home-hero";
import HomeProducts from "./components/home-products";
import NavPopdown from "./components/NavPopdown";
import Grow from '@mui/material/Grow';

const Home = () => {
  const [Scroll, setScroll] = useState({scrollOne: true});
  let scrollDisplay = "block"

  useLayoutEffect(() => {

  const onScroll = () => {
    if (window.scrollY > 0) {
      setScroll(state => ({ ...state, scrollOne: false }));
      scrollDisplay = "none"
    } if (window.scrollY === 0) {
      setScroll(state => ({ ...state, scrollOne: true }));
      scrollDisplay = "block"
    }
  };

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scorll', onScroll)
  }, [])


  return (
    <main>

    <Grow 
    in={Scroll.scrollOne} 
    style={{ transformOrigin: '100 100 100' }}
    {...(Scroll.scrollOne ? { timeout: { exit: 0, enter: 1000 } } : {})}
    >
      <Box
      addEventListener={Scroll.scrollOne}
      sx={{display: scrollDisplay}}
      >
      <NavPopdown />
      </Box> 
    </Grow>


      <HomeHero />
      <Divider />
      <HomeProducts />
    </main>
  );
};

export default Home;
