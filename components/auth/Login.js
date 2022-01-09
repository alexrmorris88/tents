// Next-React Imports
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import NextLink from "next/link";
// Utils Imports
import { toast } from "react-toastify";
import * as Yup from "yup";
// UI Imports
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Typography,
  FormHelperText,
  TextField,
  Link,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Components Layout
import Layout from "../../components/layout/Layout";

const AlertLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "inline",
  padding: theme.spacing(0.5),
  fontSize: "0.9rem",
  "&:hover": {
    color: theme.palette.action.navHover,
  },
}));

export default function Login(props) {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true);
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });
        setLoading(false);

        if (result.error) {
          toast.error(result.error);
        } else {
          router.back();
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <Layout>
      <Head>
        <title>Login</title>
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
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
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
                Log In
              </LoadingButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Alert severity="info">
                <Typography textAlign={"center"} variant="body2">
                  <NextLink href="/password/forgot" passHref>
                    <AlertLink color="textSecondary" variant="subtitle2">
                      Forgot Password?
                    </AlertLink>
                  </NextLink>
                </Typography>
              </Alert>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Divider />
            </Box>
            <Box textAlign={"center"} sx={{ mt: 2 }}>
              <Typography variant="body2">
                If you do not have an account, please
                <NextLink href="/register" passHref>
                  <AlertLink color="primary" variant="subtitle2">
                    Register
                  </AlertLink>
                </NextLink>
                here!
              </Typography>
            </Box>
          </form>
        </Grid>
      </Container>
    </Layout>
  );
}
