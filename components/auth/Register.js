// Next-React Imports
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
// Components Layout
import Layout from "../../components/layout/Layout";
import { registerUser, clearErrors } from "../../state/actions/userActions";
// Reduc Imports
import { useDispatch, useSelector } from "react-redux";
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

export default function Register(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();

  const { success, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      router.push("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmPassword: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
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
            Login
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit} {...props}>
            <TextField
              autoFocus
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
              autoFocus
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
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
              error={Boolean(formik.touched.password && formik.errors.password)}
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
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )}
              fullWidth
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
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
                Register
              </LoadingButton>
            </Box>
          </form>
        </Grid>
      </Container>
    </Layout>
  );
}
