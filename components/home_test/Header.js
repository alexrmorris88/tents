// Next-React Imports
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
// UI Imports
import {
  AppBar,
  Box,
  Container,
  IconButton,
  ButtonBase,
  Avatar,
  Link,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// Component Imports
import { loadUser } from "../../state/actions/userActions";
import { NavPopout } from "../layout/nav-popout";
import Loader from "../../components/layout/Loader";
import NavPopdown from "../home/components/NavPopdown"
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// Utils Imports
import PropTypes from "prop-types";
import { Fade } from "@mui/material";
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';

const Header = () => {
  const [Scroll, setScroll] = useState(false);
  const [BGColor, setBGColor] = useState("primary.main");
  const [BoxDisplay, setBoxDisplay] = useState("flex")
  const [BoxDisplay2, setBoxDisplay2] = useState("none")
  const [Fade, setFade] = useState({scrollOne: false})

  useLayoutEffect(() => {

  const onScroll = () => {
    const scroll = window.scrollY

    if (scroll > 1) {
      setScroll(true);
      setBGColor("background.default")
      setBoxDisplay("none")
      setBoxDisplay2('flex')
      setFade(state => ({ ...state, scrollOne: true }))
    } if (scroll === 0) {
      setScroll(false);
      setBGColor("primary.main")
      setBoxDisplay("flex")
      setBoxDisplay2("none")
      setFade(state => ({ ...state, scrollOne: false }))
    }
  };

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scorll', onScroll)
  }, [])

  return (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: BGColor,
      pt: 0.5,
      pb: 0.5,
      position: "sticky",
      top: "0px",
      zIndex: 999,
      height: "75px",
      maxHeight: "75px",
    }}

  >

    <Grow 
      in={!Fade.scrollOne} 
      style={{ transformOrigin: '100 100 100' }}
      {...(Fade.scrollOne ? {} : { timeout: { exit: 10, enter: 50 } } )}
      mountOnEnter unmountOnExit
      >
        <Box
        sx={{
          display: BoxDisplay,
        }}
        >
          <Typography color="#fff" variant="subtitle2" component="h1" sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
            Testing the font color
          </Typography>
        </Box> 
      </Grow>

      <Grow 
      in={Fade.scrollOne} 
      style={{ transformOrigin: '100 100 100' }}
      {...(Fade.scrollOne ? { timeout: { exit: 10, enter: 50 } } : {} )}
      mountOnEnter unmountOnExit
      >
        <Box
          sx={{
            display: BoxDisplay2,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <NavPopdown />
        </Box> 
      </Grow>

  </Box>

        );
};

export default Header;
