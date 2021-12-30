// Next-React Imports
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
// Utils Imports
import { toast } from "react-toastify";
import * as Yup from "yup";
// UI Imports
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Components Layout
import Layout from "../../components/layout/Layout";

export default function Login(props) {
  const theme = useTheme();
  const router = useRouter();

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
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result.error) {
          toast.error(result.error);
        } else {
          router.push("/");
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
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </Box>
          </form>
        </Grid>
      </Container>
    </Layout>
  );
}
