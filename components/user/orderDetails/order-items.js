import PropTypes from "prop-types";
import numeral from "numeral";
// UI Imports
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../utils/scrollbar";
// Utils Imports
import Loader from "../../layout/Loader";
import moment from "moment";

export const OrderItems = ({ order }, ...other) => {
  const {
    _id,
    rentalPickupDate,
    rentalDroptDate,
    dayOfRental,
    amountPaid,
    paidAt,
    tent,
    tentDetails,
  } = order;

  console.log(order);
  return (
    <Card {...other}>
      <CardHeader title="Order Info" />
      <Divider />
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Pickup Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Total Days</TableCell>
                <TableCell>Payment Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={_id}>
                <TableCell>
                  <Typography variant="subtitle2">{`${tentDetails.name}`}</Typography>
                </TableCell>
                <TableCell>
                  {`${moment(rentalPickupDate).format("LL")}`}
                </TableCell>
                <TableCell>
                  {`${moment(rentalDroptDate).format("LL")}`}
                </TableCell>
                <TableCell>{`${dayOfRental}`}</TableCell>
                <TableCell>{`${moment(paidAt).format("LL")}`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

OrderItems.propTypes = {
  orderItems: PropTypes.array.isRequired,
};
