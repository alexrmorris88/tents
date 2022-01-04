import { Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div>
      <Image src="/loader/loader.svg" width={"64px"} height={"64px"} />
    </div>
  );
};

export default Loader;
