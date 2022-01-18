import React from 'react'
// UI Imports
import {
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

const TitleComponent = (props) => {
  const { name, ...other } = props;

  return (
    <Box sx={{mt: 1, mb: 1,  pt: 1, pb: 1, width: '100%'}}>
      <Typography color="text.primary" variant="h3" component="h1">
        {name}
      </Typography>
      <Typography color="text.secondary" variant="subtitle2" component="p" sx={{ml: 1}}>
        Some text to support the title!
      </Typography>
    </Box>
  )
}

export default TitleComponent
