// Next-React Imports
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { signOut } from "next-auth/client";
// UI Imports
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
// Component Imports
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// Icon Imports
import { Cog as CogIcon } from "../../icons/cog";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from "../../icons/switch-horizontal-outlined";
import { ShoppingCart } from "../../icons/shopping-cart";

export const NavPopout = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.loadedUser);

  const handleLogout = async () => {
    try {
      onClose?.();
      await signOut();
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography
            color="primary"
            variant="overline"
            sx={{ fontSize: ".90rem" }}
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.role}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="/user/profile" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Profile</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/user/orders" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <ShoppingCart fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Orders</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/admin/dashboard" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <SwitchHorizontalOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Dashboard</Typography>}
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

NavPopout.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
