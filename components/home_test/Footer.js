// Next-React Imports
import Router, { useEffect } from 'react';
import NextLink from "next/link";
import { useRouter } from "next/router";
// UI Immports
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MinusOutlined as MinusOutlinedIcon } from "../../icons/minus-outlined";
import useMediaQuery from '@mui/material/useMediaQuery';
// Icon Imports
import { Search } from '../../icons/search';
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { MailOpen } from '../../icons/mail-open'
import { ShoppingBag } from '../../icons/shopping-bag'
import { MemoryRouter } from 'react-router-dom';


const Footer = (props) => {
  const { onClose, open } = props;
  const router = useRouter();

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));

  const iconProps = {
    fontSize: isSmallScreen ? "small" : "large"
  }
  
  const buttonProps = {
    size: isSmallScreen ? "small" : "large"
  };

  return (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: "background.default",
        borderTopColor: "divider",
        borderTopStyle: "solid",
        borderTopWidth: 1,
        p: 0.5,
        position: "sticky",
        bottom: "0px",
        zIndex: 999,
      }}

    >

      <Box
      sx={{
        width: { xs: '70vw', sm: '60vw', md: '50vw', lg: '40vw', xl: '30vw' },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
      >

      <NextLink href="/home_test" passHref>
          <Box
          sx={{
            asPath: "/home_test",
            display: 'flex',
            flexDirection: 'column',
            color: router.asPath === "/home_test" ? "primary.main" : "secondary.light",
            "&:hover": { color: "primary.main", cursor: 'pointer' }
          }}
          >
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
              }}
            >
            <Search {...iconProps} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1rem', lg: '1rem', xl: '1rem', } }} >
                Search
              </Typography>
            </Box>
          </Box>
      </NextLink> 


      <NextLink href="/#" passHref>
      <Box
      sx={{
        asPath: "/#",
        display: 'flex',
        flexDirection: 'column',
        color: 'lightgray',
        "&:hover": { color: "primary.main", cursor: 'pointer'}
      }}
      >
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
          }}
        >
        <ShoppingBag {...iconProps} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1rem', lg: '1rem', xl: '1rem', } }} >
            Orders
          </Typography>
        </Box>
      </Box>
      </NextLink>

      <NextLink href="/#" passHref>
      <Box
      sx={{
        asPath: "/#",
        display: 'flex',
        flexDirection: 'column',
        color: 'lightgray',
        "&:hover": { color: "primary.main", cursor: 'pointer'}
      }}
      >
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
          }}
        >
        <MailOpen {...iconProps} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1rem', lg: '1rem', xl: '1rem', } }} >
            Contact Us
          </Typography>
        </Box>
      </Box>
      </NextLink>

      <NextLink href="/#" passHref>
      <Box
      sx={{
        asPath: "/#",
        display: 'flex',
        flexDirection: 'column',
        color: 'lightgray',
        "&:hover": { color: "primary.main", cursor: 'pointer'}
      }}
      >
        <Box
        sx={{
        display: 'flex',
        justifyContent: 'center'
        }}
        >
        <UserCircleIcon {...iconProps} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1rem', lg: '1rem', xl: '1rem', } }} >
            Profile
          </Typography>
        </Box>
      </Box>
      </NextLink>
      
      
      <Box
        sx={{
        display: 'flex',
        justifyContent: 'center'
        }}
        >
        <Button {...buttonProps} variant="contained" >Rent Now!</Button>
      </Box>
      
      </Box>
    </Box>

    )}


export default Footer;
