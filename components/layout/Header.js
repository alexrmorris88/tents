import PropTypes from "prop-types";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Toolbar,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "../../icons/menu";
import { Logo } from "./logo";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/client";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

const HeaderLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "block",
  padding: theme.spacing(0.5),
  "&:hover": {
    color: theme.palette.action.navHover,
  },
}));

export default function Header(props) {
  const { onOpenSidebar } = props;
  const [session, loading] = useSession();
  const router = useRouter();

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
          <NextLink href="/" passHref>
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
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
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

            {session ? (
              <Button
                component="a"
                size="small"
                sx={{
                  ml: 2,
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
                variant="outlined"
                onClick={() => signOut({ callbackUrl: router.push("/") })}
              >
                Logout
              </Button>
            ) : (
              <Button
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
