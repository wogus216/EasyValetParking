import React, { useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components

import Label from 'src/components/Label';
import Scrollbar from 'src/components/Scrollbar';
import SearchNotFound from 'src/components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from 'src/sections/@dashboard/user';
// mock
import USERLIST from 'src/_mock/user';
import { StyledButtonPrimary, StyledButtonInfo } from 'src/utils/styled';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ticketNumber', label: '티켓번호', alignRight: false },
  { id: 'name', label: '성함', alignRight: false },
  { id: 'carNumber', label: '차량번호', alignRight: false },
  { id: 'parkinglot', label: '주차구역', alignRight: false },
  { id: 'enterTime', label: '입차시간', alignRight: false },
  { id: 'outTime', label: '출차시간', alignRight: false },
  { id: 'isOut', label: '출차여부', alignRight: false },
  { id: 'button', label: '버튼', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  console.log('order', order);
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const ParkingInfoTable = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('ticketNumber');

  const [filterName, setFilterName] = useState('');
  const [filterTicketNumber, setTicketNumber] = useState('');
  const [filterCarNumber, setCarNumber] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ticketNumber) => {
    console.log('ticketNumber', ticketNumber);
    const selectedIndex = selected.indexOf(ticketNumber);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ticketNumber);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleFilterByTicketNumber = (event) => {
    setTicketNumber(event.target.value);
  };
  const handleFilterByCarNumber = (event) => {
    setCarNumber(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Card>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        filterTicketNumber={filterTicketNumber}
        filterCarNumber={filterCarNumber}
        onFilterName={handleFilterByName}
        onFilterTicketNumber={handleFilterByTicketNumber}
        onFilterCarNumber={handleFilterByCarNumber}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={USERLIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, name, parkinglot, status, ticketNumber, carNumber, enterTime, outTime, isVerified } = row;
                const isItemSelected = selected.indexOf(ticketNumber) !== -1;

                return (
                  <TableRow
                    hover
                    key={id}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, ticketNumber)} />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="left" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {ticketNumber}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="left">{carNumber}</TableCell>
                    <TableCell align="left">{parkinglot}</TableCell>
                    <TableCell align="left">{enterTime}</TableCell>
                    <TableCell align="left">{outTime}</TableCell>
                    <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="left">
                      {/* <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                        {sentenceCase(status)}
                      </Label> */}
                      <StyledButtonPrimary sx={{ mr: 1 }}>출차요청</StyledButtonPrimary>
                      <StyledButtonInfo>외출요청</StyledButtonInfo>
                    </TableCell>

                    <TableCell align="right">
                      <UserMoreMenu />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={USERLIST.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ParkingInfoTable;
