import { useState, useEffect, useCallback } from "react";
import NextLink from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../../../icons/arrow-right";
import { MoreMenu } from "../../../../../utils/more-menu";
import { Scrollbar } from "../../../../../utils/scrollbar";
import { SeverityPill } from "../../../../../utils/severity-pill";

export const CustomerInvoices = (props) => {
  const [invoices, setInvoices] = useState([]);

  return (
    <Card {...props}>
      <CardHeader action={<MoreMenu />} title="Recent Invoices" />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>#{invoice.id}</TableCell>
                <TableCell>
                  {format(invoice.issueDate, "MMM dd,yyyy")}
                </TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={invoice.status === "paid" ? "success" : "error"}
                  >
                    {invoice.status}
                  </SeverityPill>
                </TableCell>
                <TableCell align="right">
                  <NextLink href="/dashboard/invoices/1" passHref>
                    <IconButton component="a">
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </NextLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={invoices.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
