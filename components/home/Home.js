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
  const RemoveNavRef = useRef(null)
  const [Scroll, setScroll] = useState({scrollOne: true});

  useLayoutEffect(() => {

  const onScroll = () => {
    if (window.scrollY > 0) {
      setScroll(state => ({ ...state, scrollOne: false }));
    } if (window.scrollY === 0) {
      setScroll(state => ({ ...state, scrollOne: true }));
    }
  };

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scorll', onScroll)
  }, [])

  return (
    <main>

    <Grow 
    in={Scroll.scrollOne} 
    style={{ transformOrigin: '0 100 0' }}
    {...(Scroll.scrollOne ? { timeout: { exit: 0, enter: 1000 } } : {})}
    >
      <Box
      ref={RemoveNavRef}
      addEventListener={Scroll.scrollOne}
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
