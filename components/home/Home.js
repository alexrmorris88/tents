//UI components
import { Divider } from "@mui/material";
//Components
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
