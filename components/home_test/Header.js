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
  const [TextColor, setTextColor] = useState("#fff");

  useLayoutEffect(() => {

  const onScroll = () => {
    const scroll = window.scrollY

    if (scroll > 1) {
      setScroll(true);
      setBGColor("background.default")
      setTextColor("primary.main")
    } if (scroll === 0) {
      setScroll(false);
      setBGColor("primary.main")
      setTextColor("#fff")
    }
  };

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scorll', onScroll)
  }, [])

  return (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: BGColor,
      pt: 1,
      position: "sticky",
      top: "0px",
      zIndex: 999,
      height: '75px',
    }}

  >


        <Box
        sx={{
          display: 'flex',
          pl: 4
        }}
        >
          <Typography color={TextColor} variant="subtitle2" component="h1" sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
            Icon
          </Typography>
        </Box> 

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <NavPopdown />
        </Box> 

        <Box>
        </Box>


  </Box>

        );
};

export default Header;
