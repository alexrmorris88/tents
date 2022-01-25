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
// Icon Imports
import Grow from '@mui/material/Grow';

const Header = () => {
  const [Scroll, setScroll] = useState({scrollOne: false});

  useLayoutEffect(() => {

  const onScroll = () => {
    if (window.scrollY > 0) {
      setScroll(state => ({ ...state, scrollOne: true }));
    } if (window.scrollY === 0) {
      setScroll(state => ({ ...state, scrollOne: false }));
    }
  };

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scorll', onScroll)
  }, [])

  return (
  <AppBar
  elevation={0}
  sx={{
    backgroundColor: "background.paper",
    borderBottomColor: "divider",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    boxShadow: 3,
    color: "text.secondary",
    mt: 1
  }}
>
  <Container>
    <Toolbar disableGutters sx={{ minHeight: 64 }}>


        <Box>
          <NavPopdown />
        </Box> 

        </Toolbar>
      </Container>
    </AppBar>

        );
};

export default Header;
