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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MinusOutlined as MinusOutlinedIcon } from "../../icons/minus-outlined";
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



  return (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: "background.default",
      borderTopColor: "divider",
      borderTopStyle: "solid",
      borderTopWidth: 1,
      pt: 0.5,
    }}
    {...props}
  >



<NextLink href="/home_test" passHref>
    <Box
    sx={{
      asPath: "/home_test",
      display: 'flex',
      flexDirection: 'column',
      color: router.asPath === "/home_test" ? "primary.main" : "secondary.main",
      "&:hover": { color: "primary.main", cursor: 'pointer' }
    }}
    >
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
        }}
      >
      <Search fontSize="large" />
      </Box>
      <Box>
        <Typography>
          Search
        </Typography>
      </Box>
    </Box>
</NextLink> 

 
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      "&:hover": { color: "primary.main", cursor: 'pointer'}
    }}
    >
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
        }}
      >
      <ShoppingBag fontSize="large" />
      </Box>
      <Box>
        <Typography  >
          Orders
        </Typography>
      </Box>
    </Box>

    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      "&:hover": { color: "primary.main", cursor: 'pointer'}
    }}
    >
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
        }}
      >
      <MailOpen fontSize="large" />
      </Box>
      <Box>
        <Typography>
          Inbox
        </Typography>
      </Box>
    </Box>


    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      "&:hover": { color: "primary.main", cursor: 'pointer'}
    }}
    >
      <Box
      sx={{
      display: 'flex',
      justifyContent: 'center'
      }}
      >
      <UserCircleIcon fontSize="large" />
      </Box>
      <Box>
        <Typography>
          Profile
        </Typography>
      </Box>
    </Box>
    

  </Box>)}


export default Footer;
