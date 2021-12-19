//UI components
import { Divider } from "@mui/material";
//Components
import { HomeHero } from "./home-hero";
import Products from "./products";

const Home = () => {
  return (
    <main>
      <HomeHero />
      <Divider />
      <Products />
    </main>
  );
};

export default Home;
