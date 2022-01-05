// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
import { wrapper } from "../../state/store";
//Component Imports
// import OrderDetails from "../../components/user/orderDetails";
// Redux Import
import Layout from "../../components/layout/Layout";
import { getUserOrderDetails } from "../../state/actions/userActions";

const UserOrders = () => {
  return (
    <Layout>
      {/* <OrderDetails title="User Order Details" /> */}
      <h1>Order Details</h1>
    </Layout>
  );
};

// Protected Route
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getUserOrderDetails(req.headers.cookie, req, params.orderID)
      );
    }
);

export default UserOrders;
