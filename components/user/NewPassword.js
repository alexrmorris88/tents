// Next-React Imports
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Components Layout
import Loader from "../layout/Loader";
// Redux Imports
import { resetPassword, clearErrors } from "../../state/actions/userActions";
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

export default function NewPassword(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      router.push("/login");
    }
  }, [dispatch, message, error]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      submit: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255),
      password: Yup.string().max(255),
      confirmPassword: Yup.string()
        .max(255)
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      await dispatch(
        resetPassword(router.query.token, { password, confirmPassword })
      );
    },
  });

  return (
    <>
      <Head>
        <title>Reset Password</title>
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
              Reset Password
            </Typography>
            <form noValidate onSubmit={formik.handleSubmit} {...props}>
              <TextField
                autoFocus
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
                  Reset Password
                </LoadingButton>
              </Box>
            </form>
          </Grid>
        </Container>
      )}
    </>
  );
}
