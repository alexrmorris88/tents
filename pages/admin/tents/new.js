// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
//Component Imports
import NewTent from "../../../components/admin/tents/NewTent";
import Layout from "../../../components/layout/Layout";

import { wrapper } from "../../../state/store";
import { loadUser } from "../../../state/actions/userActions";

const AllRoomsAdmin = () => {
  return (
    <Layout>
      <NewTent title="Products" />
    </Layout>
  );
};

// Protected Route
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AllRoomsAdmin;
