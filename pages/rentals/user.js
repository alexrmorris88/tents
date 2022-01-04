// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
//Component Imports
import UserRentals from "../../components/rental/userRentals";
import Layout from "../../components/layout/Layout";

const GetUserRentals = () => {
  return (
    <Layout>
      <UserRentals title="User Rentals" />
    </Layout>
  );
};

// Protected Route
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default GetUserRentals;
