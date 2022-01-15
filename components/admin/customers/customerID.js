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
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
// Icon Imports
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CustomerBasicDetails } from "./components/customerID/customer-basic-details";
import { CustomerDataManagement } from "./components/customerID/customer-data-management";
import { CustomerEmailsSummary } from "./components/customerID/customer-emails-summary";
import { CustomerInvoices } from "./components/customerID/customer-invoices";
import { CustomerPayment } from "./components/customerID/customer-payment";
import { CustomerLogs } from "./components/customerID/customer-logs";
// Component Imports
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
// Utils Imports
import { toast } from "react-toastify";
import { getInitials } from "../../../utils/get-initials";
import Loader from "../../layout/Loader";

const tabs = [
  { label: "Details", value: "details" },
  { label: "Invoices", value: "invoices" },
  { label: "Logs", value: "logs" },
];

const CustomerID = () => {
  const [currentTab, setCurrentTab] = useState("details");
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

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

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
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="md">
              <div>
                <Box sx={{ mb: 4 }}>
                  <NextLink href="/admin/customers" passHref>
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
                <Grid container justifyContent="space-between" spacing={3}>
                  <Grid
                    item
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
                      <Typography variant="h4">{`${customer.firstName} ${customer.lastName}`}</Typography>
                      <Typography variant="subtitle2">
                        {customer.email}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2">user_id:</Typography>
                        <Chip
                          label={customer._id}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </div>
                  </Grid>
                  <Grid item sx={{ m: -1 }}>
                    <NextLink
                      href={`/admin/customers/${customer._id}/edit`}
                      passHref
                    >
                      <Button
                        component="a"
                        endIcon={<PencilAltIcon fontSize="small" />}
                        sx={{ m: 1 }}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    </NextLink>
                    <Button
                      endIcon={<ChevronDownIcon fontSize="small" />}
                      sx={{ m: 1 }}
                      variant="contained"
                    >
                      Actions
                    </Button>
                  </Grid>
                </Grid>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
              </div>
              <Divider />
              <Box sx={{ mt: 3 }}>
                {currentTab === "details" && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <CustomerBasicDetails
                        address1={customer.address1}
                        address2={customer.address2}
                        country={customer.country}
                        email={customer.email}
                        isVerified={customer.isVerified}
                        phone={customer.phone}
                        state={customer.state}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomerPayment />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomerEmailsSummary />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomerDataManagement />
                    </Grid>
                  </Grid>
                )}
                {currentTab === "invoices" && <CustomerInvoices />}
                {currentTab === "logs" && <CustomerLogs />}
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default CustomerID;
