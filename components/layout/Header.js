import PropTypes from "prop-types";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "../../icons/menu";
import { Logo } from "./logo";

export default function Header(props) {
  const { onOpenSidebar } = props;

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0 mb-5">
          <div className="navbar-brand">
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
                    <NextLink href="/dashboard" passHref>
                      <Link
                        color="textSecondary"
                        underline="none"
                        variant="subtitle2"
                      >
                        Dashboard
                      </Link>
                    </NextLink>
                    <NextLink href="/about" passHref>
                      <Link
                        color="textSecondary"
                        sx={{ ml: 2 }}
                        underline="none"
                        variant="subtitle2"
                      >
                        About
                      </Link>
                    </NextLink>
                    <NextLink href="/profile" passHref>
                      <Link
                        color="textSecondary"
                        component="a"
                        sx={{ ml: 2 }}
                        underline="none"
                        variant="subtitle2"
                      >
                        Profile
                      </Link>
                    </NextLink>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
};
