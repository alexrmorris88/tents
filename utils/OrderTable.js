import { useEffect, useState } from "react";
import NextLink from "next/link";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Alert,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../icons/arrow-right";
import { PencilAlt as PencilAltIcon } from "../icons/pencil-alt";
import { getInitials } from "../utils/get-initials";
import { Scrollbar } from "../utils/scrollbar";
import moment from "moment";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";

export const OrderTable = (props) => {
  const { user, loading: userLoading } = useSelector(
    (state) => state.loadedUser
  );

  const {
    orders,
    ordersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedTab, setSelectedTab] = useState([]);

  // Reset selected orders when orders change
  useEffect(
    () => {
      if (selectedTab.length) {
        setSelectedTab([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orders]
  );

  // Handle the Order status
  const orderStatus = (status) => {
    if (status === "Pending") {
      return <Alert severity="error">{status}</Alert>;
    } else if (status === "Booked") {
      return <Alert severity="warning">{status}</Alert>;
    } else if (status === "Completed") {
      return <Alert severity="success">{status}</Alert>;
    } else {
      return <Alert severity="info">{status}</Alert>;
    }
  };

  const handleSelectAllTabs = (event) => {
    setSelectedTab(event.target.checked ? orders.map((order) => order.id) : []);
  };

  const handleSelectOneTab = (event, orderId) => {
    if (!selectedTab.includes(orderId)) {
      setSelectedTab((prevSelected) => [...prevSelected, orderId]);
    } else {
      setSelectedTab((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
      );
    }
  };

  const enableBulkActions = selectedTab.length > 0;
  const selectedSomeTabs =
    selectedTab.length > 0 && selectedTab.length < orders.length;
  const selectedAllTabs = selectedTab.length === orders.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: "neutral.100",
          display: !enableBulkActions && "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllTabs}
          indeterminate={selectedSomeTabs}
          onChange={handleSelectAllTabs}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllTabs}
                  indeterminate={selectedSomeTabs}
                  onChange={handleSelectAllTabs}
                />
              </TableCell>
              <TableCell>Tent Info</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Rental Dates</TableCell>
              <TableCell>Payment Info</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const isTabSelected = selectedTab.includes(order.id);

              return (
                <TableRow hover key={order.id} selected={isTabSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isTabSelected}
                      onChange={(event) => handleSelectOneTab(event, order.id)}
                      value={isTabSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src={order.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      ></Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href="#" passHref>
                          <Link color="inherit" variant="subtitle2">
                            {userLoading ? (
                              <Loader />
                            ) : (
                              `${user.firstName} ${user.lastName}`
                            )}
                          </Link>
                        </NextLink>

                        <Typography color="textSecondary" variant="body2">
                          {order.tent}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <NextLink
                        href={{
                          pathname: `/user/[slug]`,
                          query: { slug: `${order.id}` },
                        }}
                        passHref
                      >
                        <Link color="inherit" variant="subtitle2">
                          {`${order.id}`}
                        </Link>
                      </NextLink>
                    </Box>
                  </TableCell>
                  <TableCell>{`${moment(order.pickupDate).format(
                    "LL"
                  )} - ${moment(order.dropDate).format("LL")}`}</TableCell>
                  <TableCell align="center">
                    <Typography color="success.main" variant="subtitle2">
                      {numeral(order.amountPaid).format(
                        `${order.currency}0,0.00`
                      )}
                    </Typography>
                    <Typography color="success.main" variant="subtitle2">
                      {moment(order.paidAt).format("LL")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {orderStatus(order.status)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink href="#" passHref>
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink href="#" passHref>
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
