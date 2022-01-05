// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../state/store";
//Component Imports
import UserRentals from "../../../components/user/userOrders";
// Redux Import
import Layout from "../../../components/layout/Layout";
import { getUserOrder } from "../../../state/actions/userActions";

const UserOrders = () => {
  return (
    <Layout>
      <UserRentals title="User Orders" />
    </Layout>
  );
};

// Protected Route
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(getUserOrder(req.headers.cookie, req));
    }
);

export default UserOrders;
