// Next-React Imports
import { useState, useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAllUserDetailsAdmin,
} from "../../../state/actions/userActions";
// UI Imports
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Component Imports
import { CustomerEditForm } from "./components/edit/customer-edit-form";
// Utils Imports
import { getInitials } from "../../../utils/get-initials";
import Loader from "../../layout/Loader";

const CustomerEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { customerID } = router.query;

  const {
    userData = {},
    loading,
    error,
  } = useSelector((state) => state.getAllUserDetailsAdmin);

  const { user: customer = {}, rental = [] } = userData;

  useEffect(() => {
    dispatch(getAllUserDetailsAdmin(customerID));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Head>
            <title>{`${customer.firstName} ${customer.lastName} Details`}</title>
          </Head>
          <Box
            component="main"
            sx={{
              backgroundColor: "background.default",
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ mb: 4 }}>
                <NextLink href={`/admin/customers/${customerID}`} passHref>
                  <Link
                    color="textPrimary"
                    component="a"
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="subtitle2">Customers</Typography>
                  </Link>
                </NextLink>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  src={customer.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  {`${getInitials(customer.firstName)}${getInitials(
                    customer.lastName
                  )}`}
                </Avatar>
                <div>
                  <Typography noWrap variant="h4">
                    {`${customer.firstName} ${customer.lastName}`}
                  </Typography>
                  <Typography noWrap variant="subtitle2">
                    {customer.email}
                  </Typography>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography variant="subtitle2">user_id:</Typography>
                    <Chip label={customer._id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Box>
              <Box mt={3}>
                <CustomerEditForm customer={customer} loading={loading} error={error}/>
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default CustomerEdit;
