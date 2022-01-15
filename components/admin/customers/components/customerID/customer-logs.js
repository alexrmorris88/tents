import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { MoreMenu } from "../../../../../utils/more-menu";
import { Scrollbar } from "../../../../../utils/scrollbar";
import { SeverityPill } from "../../../../../utils/severity-pill";

export const CustomerLogs = (props) => {
  const [logs, setLogs] = useState([]);

  return (
    <Card {...props}>
      <CardHeader action={<MoreMenu />} title="Recent Logs" />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell width="100">
                  <Typography color="textSecondary" variant="caption">
                    {log.method}
                  </Typography>
                </TableCell>
                <TableCell width="64">
                  <SeverityPill
                    color={
                      log.status >= 200 && log.status < 300
                        ? "success"
                        : "error"
                    }
                  >
                    {log.status}
                  </SeverityPill>
                </TableCell>
                <TableCell>{log.route}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>
                  {format(log.createdAt, "yyyy/MM/dd HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};
