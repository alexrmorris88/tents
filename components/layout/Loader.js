import { Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div>
      <Image src="/loader/loader.svg" width={"20px"} height={"20px"} />
    </div>
  );
};

export default Loader;
