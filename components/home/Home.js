// UI Imports
import { Divider } from "@mui/material";
// Component Imports
import { HomeHero } from "./home-hero";
import HomeProducts from "./home-products";

const Home = () => {
  return (
    <main>
      <HomeHero />
      <Divider />
      <HomeProducts />
    </main>
  );
};

export default Home;
