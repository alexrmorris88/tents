// UI Imports
import { Divider } from "@mui/material";
// Component Imports
import { HomeHero } from "./components/home-hero";
import HomeProducts from "./components/home-products";
import NavPopdown from "./components/NavPopdown";

const Home = () => {
  return (
    <main>
      <NavPopdown />
      <HomeHero />
      <Divider />
      <HomeProducts />
    </main>
  );
};

export default Home;
