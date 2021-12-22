//React-Next Imports
import React from "react";
//Component Imports
import ProductDetails from "../../components/products/productDetails";
// Redux Imports
import { getTentDetails } from "../../state/actions/tentsAction";
import { wrapper } from "../../state/store";

export default function index() {
  return <ProductDetails />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getTentDetails(req, params.id));
    }
);
