import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const VisualizationTable = ({ filteredData, page, rowsPerPage }) => {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Player</TableCell>
          <TableCell>PV</TableCell>
          <TableCell>UV</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedData.map((dataItem, index) => (
          <TableRow key={index}>
            <TableCell>{dataItem.player}</TableCell>
            <TableCell>{dataItem.pv}</TableCell>
            <TableCell>{dataItem.uv}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VisualizationTable;
