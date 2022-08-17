import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, styled } from '@mui/material';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'code', label: '상태요청', minWidth: 100 },
  { id: 'button', label: '버튼', minWidth: 100 },
];

const rows = [
  { id: '0', carNumber: '1234', request: '출차' },
  { id: '1', carNumber: '1234', request: '출차' },
  { id: '2', carNumber: '1234', request: '외출' },
  { id: '3', carNumber: '1234', request: '출차' },
  { id: '4', carNumber: '8678', request: '외출' },
  { id: '5', carNumber: '6788', request: '출차' },
  { id: '6', carNumber: '6787', request: '외출' },
  { id: '7', carNumber: '4564', request: '출차' },
  { id: '8', carNumber: '1234', request: '외출' },
  { id: '9', carNumber: '1234', request: '외출' },
  { id: '10', carNumber: '1234', request: '외출' },
  { id: '11', carNumber: '1234', request: '외출' },
  { id: '12', carNumber: '1234', request: '외출' },
  { id: '13', carNumber: '1234', request: '외출' },
  { id: '14', carNumber: '1234', request: '외출' },
  { id: '15', carNumber: '6789', request: '외출' },
];

export default function ParkingStatusTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table>
          <TableHead st>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.carNumber}</TableCell>
                <TableCell>{data.request}</TableCell>
                <TableCell>
                  <Button variant="contained">승인</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
