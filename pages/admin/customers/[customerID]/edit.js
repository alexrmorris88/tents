// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
//Component Imports
import CustomerIDEdit from "../../../../components/admin/customers/edit";
import { DashboardLayout } from "../../../../components/admin/dashboard/nav/dashboard-layout";

const CustomerListEdit = () => {
  return (
    <DashboardLayout>
      <CustomerIDEdit title="Customer" />
    </DashboardLayout>
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

export default CustomerListEdit;
