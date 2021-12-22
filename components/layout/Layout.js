//Next-React
import React, { useState } from "react";
import Head from "next/head";
//UI Components
import { styled } from "@mui/material/styles";
//Components
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import { Footer } from "./Footer";
// CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100%",
  paddingTop: 64,
}));

const Layout = ({ children, title = "Saint John Tents" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MainLayoutRoot>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <MobileHeader
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
      <ToastContainer />
      {children}
      <Footer />
    </MainLayoutRoot>
  );
};

export default Layout;
