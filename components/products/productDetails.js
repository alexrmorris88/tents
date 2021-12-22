import React from "react";
import { useSelector } from "react-redux";
// Component Imports
import Layout from "../layout/Layout";

const productDetails = () => {
  const { tent } = useSelector((state) => state.tentDetails);

  return (
    <Layout title="Products">
      <div>
        <h1>{tent.name}</h1>
        <h1>{tent.price}</h1>
        <h1>{tent.description}</h1>
      </div>
    </Layout>
  );
};

export default productDetails;
