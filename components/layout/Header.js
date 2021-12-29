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

            <Button
              component="a"
              href="/"
              size="small"
              sx={{
                ml: 2,
                "&:hover": {
                  boxShadow: 3,
                },
              }}
              variant="outlined"
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
};
