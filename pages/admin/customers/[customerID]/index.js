// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
//Component Imports
import CustomerID from "../../../../components/admin/customers/customerID";
import { DashboardLayout } from "../../../../components/admin/dashboard/nav/dashboard-layout";

const CustomerList = () => {
  return (
    <DashboardLayout>
      <CustomerID title="Customer" />
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

export default CustomerList;
