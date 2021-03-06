//React-Next Imports
import React from "react";
// Component Imports
import ProductCard from "../../components/products/product-card";
// Redux Imports
import { getTents } from "../../state/actions/tentsAction";
import { wrapper } from "../../state/store";

export default function index() {
  return <ProductCard title="Products" />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(getTents(req, query.page));
    }
);
