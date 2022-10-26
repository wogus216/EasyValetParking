import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';

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

import { StyledButtonPrimary, StyledButtonInfo, StyledButtonSuccess } from 'src/utils/styled';
import { fNowTime } from 'src/utils/formatTime';
import { getParkings, postExitParking } from 'src/redux/slice/parking';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'src/hooks/useAuth';
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

// const parkingData = [
//   {
//     ticketNumber: 1234,
//     name: '권재현',
//     carNumber: 1234,
//     enterTime: fNowTime(new Date()),
//     outTime: fNowTime(new Date()),
//     isVerified: 'Yes',
//   },
// ];

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
    return filter(
      array,
      (_user) => _user.ticketNumber === Number(query) || _user.carNumber === query || _user.vipName === query
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const ParkingInfoTable = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('ticketNumber');

  const [filterData, setFilterData] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [parkingData, setParkingData] = useState([
    // {
    //   ticketNumber: 1234,
    //   name: '권재현',
    //   carNumber: 1234,
    //   enterTime: fNowTime(new Date()),
    //   outTime: fNowTime(new Date()),
    //   isVerified: 'Yes',
    // },
  ]);
  const dispatch = useDispatch();
  const { parkings } = useSelector((state) => state.parkings);

  useEffect(() => {
    dispatch(getParkings());
    setParkingData([...parkings]);
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = parkings.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ticketNumber) => {
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

  const handleFilterData = (event) => {
    setFilterData(event.target.value);
  };

  // 출차, 외출 요청
  const handleExitParking = (ticketId, exitType) => {
    console.log('exitParking data==>', ticketId);
    console.log('exitParking exitType==>', exitType);
    dispatch(postExitParking(ticketId, exitType));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - parkings.length) : 0;

  const filteredUsers = applySortFilter(parkings, getComparator(order, orderBy), filterData);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Card>
      <UserListToolbar numSelected={selected.length} filterData={filterData} onFilterData={handleFilterData} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={parkings.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { parkingId, vipName, parkingArea, ticketNumber, carNumber, entranceAt, exitAt, carStatus } = row;
                const isItemSelected = selected.indexOf(ticketNumber) !== -1;

                return (
                  <TableRow
                    hover
                    key={parkingId}
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
                    <TableCell align="left">{vipName}</TableCell>
                    <TableCell align="left">{carNumber}</TableCell>
                    <TableCell align="left">{parkingArea}</TableCell>
                    <TableCell align="left">{fNowTime(entranceAt)}</TableCell>
                    <TableCell align="left">{fNowTime(exitAt)}</TableCell>
                    <TableCell align="left">{carStatus ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="left">
                      <StyledButtonPrimary
                        sx={{ mr: 1 }}
                        onClick={() => {
                          handleExitParking(parkingId, 0);
                        }}
                      >
                        출차요청
                      </StyledButtonPrimary>
                      <StyledButtonInfo
                        onClick={() => {
                          handleExitParking(parkingId, 1);
                        }}
                      >
                        외출요청
                      </StyledButtonInfo>
                    </TableCell>
                    {/* 요청대기 , 외출중, 출차 완료 나눠서 표시하기 */}
                    {/* <TableCell>
                      <StyledButtonSuccess>요청 대기</StyledButtonSuccess>
                    </TableCell> */}

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
                    <SearchNotFound searchQuery={filterData} />
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
        count={parkings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ParkingInfoTable;
