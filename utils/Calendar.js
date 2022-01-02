import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Calendar({ setCalandarDates, onChangeCalendar }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Rental Date Start"
        endText="Rental Date End"
        value={setCalandarDates}
        onChange={onChangeCalendar}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField variant="outlined" size="small" {...startProps} />
            <Box sx={{ mx: 2 }}>
              <Typography variant="overline"> to </Typography>
            </Box>
            <TextField variant="outlined" size="small" {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}