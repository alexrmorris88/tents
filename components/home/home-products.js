import { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Cog as CogIcon } from "../../icons/cog";
import { Lock as LockIcon } from "../../icons/lock";
import { MinusOutlined as MinusOutlinedIcon } from "../../icons/minus-outlined";
import { Template as TemplateIcon } from "../../icons/template";

const getFeatures = (theme) => [
  {
    icon: LockIcon,
    image: `/tents/large-tent.jpg`,
    items: ["50-100 people", "20 X 40 ft", "Large Tent", "and More"],
    subheader: "Tent Features",
    title: "Large Tents",
  },
  {
    icon: CogIcon,
    items: ["30-50 people", "10 X 30 ft", "Medium Tent", "and More"],
    subheader: "Get started with ready-to-deploy templates.",
    image: `/tents/medium-tent.jpg`,
    title: "Medium Tents",
  },
  {
    icon: TemplateIcon,
    image: `/tents/small-tent.jpg`,
    items: ["10-30 people", "10 X 20 ft", "Small Tent", "and More"],
    subheader: "We also have included all the necessary layouts for a startup.",
    title: "Small Tents",
  },
];

export default function Products(props) {
  const theme = useTheme();
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = getFeatures(theme.palette.mode);

  const handleChangeFeature = (index) => {
    setSelectedFeature(index);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        py: 15,
      }}
      {...props}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography variant="h3">Our tents</Typography>
            <Typography
              color="textSecondary"
              sx={{ py: 2 }}
              variant="subtitle1"
            >
              Please see our selection of tents below.
            </Typography>
            {features.map((feature, index) => {
              const { icon: Icon, items, subheader, title } = feature;

              const selected = index === selectedFeature;

              return (
                <Box
                  key={title}
                  onClick={() => handleChangeFeature(index)}
                  sx={{
                    backgroundColor:
                      selected && alpha(theme.palette.primary.main, 0.08),
                    borderRadius: 1,
                    cursor: selected ? "default" : "pointer",
                    display: "flex",
                    mb: 2,
                    p: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: selected && "primary.main",
                      color: selected && "primary.contrastText",
                      mr: 2,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Avatar>
                  <div>
                    <Typography variant="h6">{title}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {subheader}
                    </Typography>
                    {selected && (
                      <List
                        disablePadding
                        sx={{
                          display: "grid",
                          gridTemplateColumns: items.length > 4 && {
                            sm: "repeat(2, 1fr)",
                          },
                          gap: 1,
                          pt: 2,
                        }}
                      >
                        {items.map((item) => (
                          <ListItem disableGutters key={item} sx={{ py: 0 }}>
                            <ListItemAvatar
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                minWidth: 0,
                                mr: 0.5,
                              }}
                            >
                              <MinusOutlinedIcon color="primary" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2">
                                  {item}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </div>
                </Box>
              );
            })}
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                position: "relative",
                pt: "calc(965 / 1224 * 100%)",
                "& img": {
                  height: "auto",
                  position: "absolute",
                  top: 0,
                  width: "100%",
                },
              }}
            >
              <img
                alt={features[selectedFeature].title}
                src={features[selectedFeature].image}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
