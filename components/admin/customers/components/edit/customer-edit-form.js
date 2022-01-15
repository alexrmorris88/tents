// Next-React Imports
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import {
  editAllUserDetailsAdmin,
  clearErrors,
} from "../../../../../state/actions/userActions";
// UI Imports
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
// Utils Imports
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { wait } from "../../../../../utils/wait";
import Loader from "../../../../layout/Loader";

export const CustomerEditForm = (props) => {
  const { customer, loading, error, ...other } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const { customerID } = router.query;

  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || "",
      address2: customer.address2 || "",
      country: customer.country || "",
      email: customer.email || "",
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      phone: customer.phone || "",
      state: customer.state || "",
      submit: null,
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }

      dispatch(editAllUserDetailsAdmin(customerID, values));
      router.push(`/admin/customers/${customerID}`);
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={formik.handleSubmit} {...other}>
          <Card>
            <CardHeader title="Edit Customer Info" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.firstName && formik.errors.firstName
                    )}
                    fullWidth
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    label="First Name"
                    name="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.firstName}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.lastName && formik.errors.lastName
                    )}
                    fullWidth
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    label="Last Name"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.lastName}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.email}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.country && formik.errors.country
                    )}
                    fullWidth
                    helperText={formik.touched.country && formik.errors.country}
                    label="Country"
                    name="country"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.country}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.state && formik.errors.state)}
                    fullWidth
                    helperText={formik.touched.state && formik.errors.state}
                    label="State/Region"
                    name="state"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.address1 && formik.errors.address1
                    )}
                    fullWidth
                    helperText={
                      formik.touched.address1 && formik.errors.address1
                    }
                    label="Address 1"
                    name="address1"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address1}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.address2 && formik.errors.address2
                    )}
                    fullWidth
                    helperText={
                      formik.touched.address2 && formik.errors.address2
                    }
                    label="Address 2"
                    name="address2"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address2}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Phone number"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <div>
                  <Typography gutterBottom variant="subtitle1">
                    Make Contact Info Public
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ mt: 1 }}
                  >
                    Means that anyone viewing your profile will be able to see
                    your contacts details
                  </Typography>
                </div>
                <Switch
                  checked={formik.values.isVerified}
                  color="primary"
                  edge="start"
                  name="isVerified"
                  onChange={formik.handleChange}
                  value={formik.values.isVerified}
                />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography gutterBottom variant="subtitle1">
                    Available to hire
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ mt: 1 }}
                  >
                    Toggling this will let your teammates know that you are
                    available for acquiring new projects
                  </Typography>
                </div>
                <Switch
                  checked={formik.values.hasDiscount}
                  color="primary"
                  edge="start"
                  name="hasDiscount"
                  onChange={formik.handleChange}
                  value={formik.values.hasDiscount}
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Button
                disabled={formik.isSubmitting}
                type="submit"
                sx={{ m: 1 }}
                variant="contained"
              >
                Update
              </Button>
              <NextLink href={`/admin/customers/${customerID}`} passHref>
                <Button
                  component="a"
                  disabled={formik.isSubmitting}
                  sx={{
                    m: 1,
                    mr: "auto",
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </NextLink>
              <Button color="error" disabled={formik.isSubmitting}>
                Delete user
              </Button>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};

CustomerEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
