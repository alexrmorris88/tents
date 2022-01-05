// Next-React Imports
import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// UI Imports
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
// Component Imports
import { OrderItems } from "../../../components/user/orderDetails/order-items";
import { OrderLogs } from "../../../components/user/orderDetails/order-logs";
import { OrderSummary } from "../../../components/user/orderDetails/order-summary";
// Utils Imports
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "../../../icons/calendar";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { gtm } from "../../../utils/gtm";
import moment from "moment";
import Loader from "../../layout/Loader";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  const { orderDetails, loading: orderLoading } = useSelector(
    (state) => state.userOrderDetails
  );

  return (
    <>
      {orderLoading && ordersLoading ? (
        <Loader />
      ) : (
        <>
          <Head>
            <title>
              {`${orderDetails.userDetails.firstName} ${orderDetails.userDetails.lastName} Orders`}
            </title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ mb: 4 }}>
                <NextLink href="/user/orders" passHref>
                  <Link
                    color="textPrimary"
                    component="a"
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="subtitle2">
                      {`${orderDetails.userDetails.firstName} ${orderDetails.userDetails.lastName} Order Details`}
                    </Typography>
                  </Link>
                </NextLink>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Grid container justifyContent="space-between" spacing={3}>
                  <Grid item>
                    <Typography variant="h4">{orderDetails._id}</Typography>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        ml: -1,
                        mt: 1,
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        variant="body2"
                        sx={{ ml: 1 }}
                      >
                        Placed on
                      </Typography>
                      <CalendarIcon
                        color="action"
                        fontSize="small"
                        sx={{ ml: 1 }}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {moment(orderDetails.createdAt).format("LL")}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ ml: -2 }}>
                    <Button
                      endIcon={<PencilAltIcon fontSize="small" />}
                      variant="outlined"
                      sx={{ ml: 2 }}
                    >
                      Edit
                    </Button>
                    <Button
                      endIcon={<ChevronDownIcon fontSize="small" />}
                      variant="contained"
                      sx={{ ml: 2 }}
                    >
                      Action
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <OrderSummary order={orderDetails} />
              <Box sx={{ mt: 4 }}>
                <OrderItems order={orderDetails} />
              </Box>
              <Box sx={{ mt: 4 }}>
                <OrderLogs order={orderDetails} />
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default OrderDetails;
