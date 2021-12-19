import NextLink from "next/link";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from "../../icons/check-circle-outlined";
import { Users as UsersIcon } from "../../icons/users";
import { Star as StarIcon } from "../../icons/star";
import { Template as TemplateIcon } from "../../icons/template";

export const HomeHero = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: 6,
      }}
      {...props}
    >
      <Container
        maxWidth="md"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography color="primary" variant="overline">
          Introducing
        </Typography>
        <Typography align="center" variant="h1">
          Saint John Tents
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          The best site for renting tents in Saint John, NB!
        </Typography>
        <Box
          sx={{
            alignItems: {
              sm: "center",
              xs: "flex-start",
            },
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            py: 3,
            m: -1,
            "& > *": {
              m: 1,
            },
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Available For:
          </Typography>
          {["Weddings", "Work Events", "Outdoor Gatherings"].map((item) => (
            <Box
              key={item}
              sx={{
                alignItems: "center",
                display: "flex",
                m: 2,
              }}
            >
              <CheckCircleOutlinedIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">{item}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mx: -1,
            mt: 2,
            mb: 6,
            "& > a": {
              m: 1,
            },
          }}
        >
          <NextLink href="/browse" passHref>
            <Button component="a" size="large" variant="outlined">
              Browse
            </Button>
          </NextLink>
          <NextLink href="/dashboard" passHref>
            <Button component="a" size="large" variant="contained">
              Rent Now!
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};
