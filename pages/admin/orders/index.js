// React-Next Imports
import React from "react";
import { getSession } from "next-auth/client";
//Component Imports
import AdminOrders from "../../../components/admin/orders/index";
import { DashboardLayout } from "../../../components/admin/dashboard/nav/dashboard-layout";

const Orders = () => {
  return (
    <DashboardLayout>
      <AdminOrders title="Orders" />
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

export default Orders;
