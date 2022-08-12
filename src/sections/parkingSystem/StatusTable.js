import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

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
  { id: '4', carNumber: '1234', request: '외출' },
  { id: '5', carNumber: '1234', request: '출차' },
  { id: '6', carNumber: '1234', request: '외출' },
  { id: '7', carNumber: '1234', request: '출차' },
  { id: '8', carNumber: '1234', request: '외출' },
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table>
          <TableHead>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableHead>

          <TableBody>
            {rows.map((data, i) => (
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
        rowsPerPageOptions={[10, 25, 100]}
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
