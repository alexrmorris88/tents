//Next-React
import React, { useState } from "react";
import Head from "next/head";
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
// Components
import Header from "./Header";
import Footer from "./Footer";
// CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Layout = (props) => {
  const {
    children, 
    title = "Saint John Tents", 
    ...other } = props

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
        <ToastContainer />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
