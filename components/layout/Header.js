// Next-React Imports
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
// UI Imports
import {
  AppBar,
  Box,
  Container,
  IconButton,
  ButtonBase,
  Avatar,
  Link,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// Component Imports
import { loadUser } from "../../state/actions/userActions";
import { NavPopout } from "./nav-popout";
import Loader from "../../components/layout/Loader";
import NavPopdown from "../home/components/NavPopdown"
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// Utils Imports
import PropTypes from "prop-types";
// Icon Imports
import { Menu as MenuIcon } from "../../icons/menu";
import { Logo } from "./logo";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import Grow from '@mui/material/Grow';

const HeaderLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "block",
  padding: theme.spacing(0.5),
  "&:hover": {
    color: theme.palette.action.navHover,
  },
}));

const LoggedInUser = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const { user, loading } = useSelector((state) => state.loadedUser);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: 16,
          p: 0.5,
          ":hover": {
            backgroundColor: 'divider'
          }
        }}
      >
        <Box
        sx={{
          alignItems: "center",
          display: "flex"
        }}
        >
        <MenuIcon fontSize="small" />
        </Box>
        <Box
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 0.5,
          mr: 0.5
        }}
        >
        <Avatar
          sx={{
            height: 30,
            width: 30,
          }}
          src={user.avatar}
        >
          <UserCircleIcon fontSize="medium"  />
        </Avatar>
        </Box>
      </Box>
      <NavPopout
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export default function Header(props) {
  const { onOpenSidebar } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [Scroll, setScroll] = useState({scrollOne: false});

  const { user, loading } = useSelector((state) => state.loadedUser);

  useLayoutEffect(() => {

  const onScroll = () => {
    if (window.scrollY > 0) {
      setScroll(state => ({ ...state, scrollOne: true }));
    } if (window.scrollY === 0) {
      setScroll(state => ({ ...state, scrollOne: false }));
    }
  };

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scorll', onScroll)
  }, [])

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "text.secondary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          {/* <NextLink href="/" passHref>
            <a>
              <Logo
                sx={{
                  display: {
                    md: "inline",
                    xs: "none",
                  },
                  height: 40,
                  width: 40,
                }}
              />
            </a>
          </NextLink> */}
              <Grow 
               in={Scroll.scrollOne} 
               style={{ transformOrigin: '100 100 100' }}
               sx={{ flexGrow: 1, width: '40%'}}
               {...(Scroll.scrollOne ? { timeout: { exit: 0, enter: 1000 } } : {})}
             >
                <Box
                  addEventListener={Scroll.scrollOne}
                >
                  <NavPopdown />
                </Box> 
              </Grow>

          <Box />
          <IconButton
            color="inherit"
            onClick={onOpenSidebar}
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: "center",
              display: {
                md: "flex",
                xs: "none",
              },
            }}
          >
            <NextLink href="/products" passHref>
              <HeaderLink
                color="textSecondary"
                underline="none"
                variant="subtitle2"
              >
                Products
              </HeaderLink>
            </NextLink>

            {loading ? (
              <Loader />
            ) : user ? (
              <LoggedInUser />
            ) : (
              <Button
                color="primary"
                component="a"
                href="/login"
                size="small"
                sx={{
                  ml: 2,
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
                variant="contained"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
};
