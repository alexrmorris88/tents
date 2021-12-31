// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
//Component Imports
import Profile from "../../components/user/Profile";
import Layout from "../../components/layout/Layout";

import { wrapper } from "../../state/store";
import { loadUser } from "../../state/actions/userActions";

const UserProfile = () => {
  return (
    <Layout>
      <Profile title="Profile" />
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

export default UserProfile;
