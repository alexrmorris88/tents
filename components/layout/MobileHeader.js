// Next-React Imports
import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
// UI Imports
import {
  Box,
  Button,
  Drawer,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// Component Imports
import { loadUser } from "../../state/actions/userActions";
// Utils Imports
import PropTypes from "prop-types";

const MainSidebarLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "block",
  padding: theme.spacing(1),
  "&:hover": {
    color: theme.palette.action.navHover,
  },
}));

export default function MobileHeader(props) {
  const { onClose, open } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.loadedUser);

  const handlePathChange = () => {
    if (open) {
      onClose?.();
    }
  };

  const sx_nav_button = {
    m: 2,
    pl: 10,
    pr: 10,
    display: "flex",
    flexDirection: "center",
    "&:hover": {
      boxShadow: 3,
    },
  };

  const NavList = [
    { link: "/", title: "Home" },
    { link: "/products", title: "Products" },
  ];

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }

    handlePathChange,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [router.asPath];
  }, [dispatch, user]);

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={!lgUp && open}
      PaperProps={{ sx: { width: 256 } }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
      variant="temporary"
    >
      <Box sx={{ p: 1 }}>
        <Typography
          color="text.secondary"
          variant="overline"
          sx={{ fontSize: ".75rem" }}
        >
          {user ? "Welcome  " : ""}
        </Typography>
        <Typography
          color="primary"
          variant="overline"
          sx={{ fontSize: ".90rem" }}
        >
          {user ? `${user.firstName} ${user.lastName} ` : "Nav"}
        </Typography>
        <Divider />
        {NavList.map((items) => {
          return (
            <NextLink href={items.link} passHref>
              <MainSidebarLink
                color="textSecondary"
                underline="none"
                variant="subtitle2"
              >
                {items.title}
              </MainSidebarLink>
            </NextLink>
          );
        })}

        <br />
        <Divider />

        {user ? (
          <Button
            color="inherit"
            component="a"
            size="small"
            sx={sx_nav_button}
            variant="outlined"
            onClick={() => signOut({ callbackUrl: router.push("/") })}
          >
            Logout
          </Button>
        ) : (
          <Button
            color="primary"
            component="a"
            href="/login"
            size="small"
            sx={sx_nav_button}
            variant="contained"
          >
            Login
          </Button>
        )}
      </Box>
    </Drawer>
  );
}

MobileHeader.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
