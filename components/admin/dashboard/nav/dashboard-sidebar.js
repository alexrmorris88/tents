// Next-React Imports
import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
// Component Imports
import { Logo } from "../../../layout/logo";
import { Scrollbar } from "../../../../utils/scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "../uitls/popovers/organization-popover";
// UI Imports
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
// Icon Imports
import { Calendar as CalendarIcon } from "../../../../icons/calendar";
import { Cash as CashIcon } from "../../../../icons/cash";
import { ChartBar as ChartBarIcon } from "../../../../icons/chart-bar";
import { ChartPie as ChartPieIcon } from "../../../../icons/chart-pie";
import { ChatAlt2 as ChatAlt2Icon } from "../../../../icons/chat-alt2";
import { ClipboardList as ClipboardListIcon } from "../../../../icons/clipboard-list";
import { CreditCard as CreditCardIcon } from "../../../../icons/credit-card";
import { Home as HomeIcon } from "../../../../icons/home";
import { LockClosed as LockClosedIcon } from "../../../../icons/lock-closed";
import { Mail as MailIcon } from "../../../../icons/mail";
import { MailOpen as MailOpenIcon } from "../../../../icons/mail-open";
import { Newspaper as NewspaperIcon } from "../../../../icons/newspaper";
import { OfficeBuilding as OfficeBuildingIcon } from "../../../../icons/office-building";
import { ReceiptTax as ReceiptTaxIcon } from "../../../../icons/receipt-tax";
import { Selector as SelectorIcon } from "../../../../icons/selector";
import { Share as ShareIcon } from "../../../../icons/share";
import { ShoppingBag as ShoppingBagIcon } from "../../../../icons/shopping-bag";
import { ShoppingCart as ShoppingCartIcon } from "../../../../icons/shopping-cart";
import { Truck as TruckIcon } from "../../../../icons/truck";
import { UserCircle as UserCircleIcon } from "../../../../icons/user-circle";
import { Users as UsersIcon } from "../../../../icons/users";
import { XCircle as XCircleIcon } from "../../../../icons/x-circle";
// Utils Imports
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const getSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Overview"),
        path: "/admin/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: t("Account"),
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("Management"),
    items: [
      {
        title: t("Customers"),
        path: "/admin/customers",
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: t("List"),
            path: "/admin/customers",
          },
        ],
      },
      {
        title: t("Tents"),
        path: "/admin/tents",
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          {
            title: t("All Tents"),
            path: "/admin/tents",
          },
          {
            title: t("New Tent"),
            path: "/admin/tents/new",
          },
        ],
      },
      {
        title: t("Orders"),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: "/admin/orders",
        children: [
          {
            title: t("List"),
            path: "/admin/orders",
          },
          {
            title: t("New"),
            path: "/admin/orders/new",
          },
        ],
      },
      {
        title: t("Invoices"),
        path: "/dashboard/invoices",
        icon: <ReceiptTaxIcon fontSize="small" />,
        children: [
          {
            title: t("List"),
            path: "/dashboard/invoices",
          },
          {
            title: t("Details"),
            path: "/dashboard/invoices/1",
          },
        ],
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

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

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    SJ Tents
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {t("Role")} : Admin
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: "neutral.500",
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t("Need Help?")}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {t("Check our docs")}
            </Typography>
            <NextLink href="#" passHref>
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t("Documentation")}
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
