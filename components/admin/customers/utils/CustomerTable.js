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
import { Trash as TrashCan } from "../../../../icons/trash";
import { PencilAlt as PencilAltIcon } from "../../../../icons/pencil-alt";
import { Scrollbar } from "../../../../utils/scrollbar";
import moment from "moment";

export const CustomerTable = (props) => {
  const {
    customers,
    customerCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedTab, setSelectedTab] = useState([]);

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedTab.length) {
        setSelectedTab([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers]
  );

  const handleSelectAllTabs = (event) => {
    setSelectedTab(
      event.target.checked ? customers.map((customer) => customer.id) : []
    );
  };

  const handleSelectOneTab = (event, customerId) => {
    if (!selectedTab.includes(customerId)) {
      setSelectedTab((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedTab((prevSelected) =>
        prevSelected.filter((id) => id !== customerId)
      );
    }
  };

  const enableBulkActions = selectedTab.length > 0;
  const selectedSomeTabs =
    selectedTab.length > 0 && selectedTab.length < customers.length;
  const selectedAllTabs = selectedTab.length === customers.length;

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
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>Date Joined</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isTabSelected = selectedTab.includes(customer._id);

              return (
                <TableRow hover key={customer._id} selected={isTabSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isTabSelected}
                      onChange={(event) =>
                        handleSelectOneTab(event, customer._id)
                      }
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
                        src={customer.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      ></Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href="#" passHref>
                          <Link color="inherit" variant="subtitle2">
                            {`${customer.firstName} ${customer.lastName}`}
                          </Link>
                        </NextLink>

                        <Typography
                          color="textSecondary"
                          variant="body2"
                          sx={{ fontSize: ".75rem" }}
                        >
                          {customer._id}
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
                      {`${customer.email}`}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {customer.role === "admin" ? (
                      <Typography color="success.main" variant="subtitle2">
                        {customer.role}
                      </Typography>
                    ) : (
                      <Typography variant="subtitle2">
                        {customer.role}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {moment(customer.createdAt).format("LLL")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink href="#" passHref>
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <IconButton
                      onClick={() => {
                        console.log(customer._id);
                      }}
                    >
                      <TrashCan fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={customerCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

CustomerTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customerCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
