//React-Next Imports
import React from "react";
//Component Imports
import Layout from "../../components/home_test/Layout";
import Home_test from "../../components/home_test/index";
// Redux Imports
import { getTentDetails } from "../../state/actions/tentsAction";
import { wrapper } from "../../state/store";


export default function HomeTest() {

  return (
    <div>
      <Layout>
        <Home_test />
      </Layout>
    </div>
  );
}
