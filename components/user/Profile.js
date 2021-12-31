// Next-React Imports
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Components Layout
import Loader from "../layout/Loader";
// Redux Imports
import { updateProfile, clearErrors } from "../../state/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../state/constants/userConstants";
// Utils Imports
import { toast } from "react-toastify";
import * as Yup from "yup";
// UI Imports
import { useFormik } from "formik";
import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Profile(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();

  const { user, loading } = useSelector((state) => state.loadedUser);

  const {
    error,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.modifyUser);

  const [User, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_PROFILE_RESET });
      window.location.reload();
    }
  }, [dispatch, isUpdated, user, error]);

  const formik = useFormik({
    initialValues: {
      firstName: User.firstName,
      lastName: User.lastName,
      email: User.email,
      password: "",
      confirmPassword: "",
      submit: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().max(255),
      lastName: Yup.string().max(255),
      email: Yup.string().email("Must be a valid email").max(255),
      password: Yup.string().max(255),
      confirmPassword: Yup.string()
        .max(255)
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      await dispatch(updateProfile(values));
    },
  });

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Grid sx={{ m: 1, padding: 3 }}>
            <Typography
              variant="caption"
              component="h1"
              color="primary"
              sx={{ fontSize: "1.5rem" }}
            >
              Profile
            </Typography>
            <form noValidate onSubmit={formik.handleSubmit} {...props}>
              <TextField
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                margin="normal"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.firstName}
              />
              <TextField
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                margin="normal"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.lastName}
              />
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
              <TextField
                error={Boolean(
                  formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                )}
                fullWidth
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                label="Confirm Password"
                margin="normal"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirmPassword}
              />
              {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{formik.errors.submit}</FormHelperText>
                </Box>
              )}
              <Box sx={{ mt: 2 }}>
                <LoadingButton
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  loading={loading}
                  loadingIndicator="Loading..."
                  variant="contained"
                >
                  Update Profile
                </LoadingButton>
              </Box>
            </form>
          </Grid>
        </Container>
      )}
    </>
  );
}
