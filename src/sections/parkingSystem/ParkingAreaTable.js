import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getParkingArea } from 'src/redux/slice/parking';

const columns = [
  { id: 'name', label: '번호', minWidth: 100 },
  { id: 'code', label: '주차구역', minWidth: 100 },
  { id: 'button', label: '현재수', minWidth: 100 },
];

export default function ParkingAreaTable() {
  const disPatch = useDispatch();
  const { parkingArea } = useSelector((state) => state.parkings);
  const [parkingAreaStatus, setParkingAreaStatus] = useState({
    M: '',
    M2: '',
    B: '',
    IP: '',
    K: '',
  });

  useEffect(() => {
    disPatch(getParkingArea());
    console.log('parkingArea==>', parkingArea);
    setParkingAreaStatus({
      M: parkingArea[4].carCount,
      M2: parkingArea[6].carCount,
      B: parkingArea[0].carCount,
      H: parkingArea[1].carCount,
      IP: parkingArea[2].carCount,
      K: parkingArea[3].carCount,
    });
  }, [disPatch]);

  const rows = [
    { id: '0', keyNumber: '1', parkginglotName: 'M', status: parkingAreaStatus.M },
    { id: '1', keyNumber: '2', parkginglotName: 'M2', status: parkingAreaStatus.M2 },
    { id: '2', keyNumber: 'B', parkginglotName: 'B', status: parkingAreaStatus.B },
    { id: '4', keyNumber: '3', parkginglotName: 'IP', status: parkingAreaStatus.IP },
    { id: '3', keyNumber: '4', parkginglotName: 'H', status: parkingAreaStatus.IP },
    { id: '5', keyNumber: '5', parkginglotName: 'K', status: parkingAreaStatus.K },
  ];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: theme.palette.gradients.violet,
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
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
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
