// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
//Component Imports
import ForgotPassword from "../../components/user/ForgotPassword";
import Layout from "../../components/layout/Layout";

const Forgot = () => {
  return (
    <Layout>
      <ForgotPassword title="Forgot Password" />
    </Layout>
  );
};

// Protected Route
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Forgot;
