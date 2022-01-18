// Next-React Imports
import React from 'react';
// UI Imports
import {
  Typography,
  Grid,
} from "@mui/material";
// Icons Import
import { CreditCard } from '../../../icons/credit-card'
import { DeviceTablet } from '../../../icons/device-tablet'
import { Chat } from '../../../icons/chat'
import { LockClosed } from '../../../icons/lock-closed'

const FeaturesComponent = () => { 

  const features = [
    {
      Title: "Feature 1",
      Desc: "A breif description of feature 1",
      Icon: <CreditCard style={{ fontSize: 50 }} color='action' />
    },
    {
      Title: "Feature 2",
      Desc: "A breif description of feature 2",
      Icon: <DeviceTablet style={{ fontSize: 50 }} color='action' />
    },
    {
      Title: "Feature 3",
      Desc: "A breif description of feature 3",
      Icon: <Chat style={{ fontSize: 50 }} color='action' />
    },
    {
      Title: "Feature 4",
      Desc: "A breif description of feature 4",
      Icon: <LockClosed style={{ fontSize: 50 }} color='action' />
    }
  ]

  return (
    <>
    <Grid sx={{m: 2}}>
    {features.map((feature) => (
        <>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
              mb: 2,
            }}
          >
            {feature.Icon}
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "block",
                overflow: "hidden",
                ml: 1,
              }}
            >
              <Typography variant={'h6'} component={"h1"}>{feature.Title}</Typography>
              <Typography variant={'body1'} component={"body"} color={'text.secondary'}>
                {feature.Desc}
              </Typography>
            </Grid>
          </Grid>
        </>)
      )}
      </Grid>
  </>)
}

export default FeaturesComponent
