import React, { useState } from "react";
import Head from "next/head";

import Header from "./Header";
import MobileHeader from "./MobileHeader";
import { Footer } from "./Footer";

const Layout = ({ children, title = "Saint John Tents" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
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
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
