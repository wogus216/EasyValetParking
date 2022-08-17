import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, styled } from '@mui/material';

const columns = [
  { id: 'name', label: '번호', minWidth: 100 },
  { id: 'code', label: '주차구역', minWidth: 100 },
  { id: 'button', label: '현재수', minWidth: 100 },
];

export default function ParkginglotTable() {
  const [parkginglogStatus, setparkginglogStatus] = useState({
    M: 1,
    M2: 2,
    B: 5,
    IP: 3,
    K: 10,
  });

  const rows = [
    { id: '0', keyNumber: '1', parkginglotName: 'M', status: parkginglogStatus.M },
    { id: '1', keyNumber: '2', parkginglotName: 'M2', status: parkginglogStatus.M2 },
    { id: '2', keyNumber: 'B', parkginglotName: 'B', status: parkginglogStatus.B },
    { id: '4', keyNumber: '3', parkginglotName: 'IP', status: parkginglogStatus.IP },
    { id: '3', keyNumber: '4', parkginglotName: 'H', status: parkginglogStatus.IP },
    { id: '5', keyNumber: '5', parkginglotName: 'K', status: parkginglogStatus.K },
  ];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: 'center',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
      textAlign: 'center',
    },
  }));

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table>
          <TableHead st>
            {columns.map((column) => (
              <StyledTableCell key={column.id} style={{ top: 57, minWidth: column.minWidth }}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableHead>

          <TableBody>
            {rows.map((data, i) => (
              <TableRow key={data.id}>
                <StyledTableCell size="small">{data.keyNumber}</StyledTableCell>
                <StyledTableCell size="small">{data.parkginglotName}</StyledTableCell>
                <StyledTableCell size="small">{data.status}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
