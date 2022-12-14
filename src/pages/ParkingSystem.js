import React, { useState } from 'react';

// @mui
import { Grid, Container, Typography } from '@mui/material';

// components
import Page from 'src/components/Page';

// sections
import { PakringForm, StatusBox } from 'src/sections/parkingSystem';

import ToggleSwitch from 'src/components/ToggleSwitch';
import CarInfoTable from 'src/sections/parkingSystem/ParkingInfoTable';
import { useSelector } from 'react-redux';
import _, { filter } from 'lodash';
import Loading from 'src/components/Loading';

// ----------------------------------------------------------------------

export default function ParkingSystem() {
  const { parkings } = useSelector((state) => state.parkings);
  const [show, setShow] = useState({
    showOutingTable: true,
    showParkinglotTable: true,
  });
  const token = window.localStorage.getItem('accessToken');
  console.log('토큰====>>', token);

  // 오늘 출차차량
  const exitedCar = _.filter(parkings, { exitAt: '9999-12-31 00:00:00' });

  return (
    <Page title="ParkingSystem">
      {token === null ? (
        <Loading />
      ) : (
        <Container maxWidth="xl">
          <PakringForm />
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h5">요청현황 : 25대</Typography>
              <StatusBox type="요청" />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h5">출차현황 : 25대</Typography>
              <StatusBox type="출차" />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Grid container justifyContent="space-around" alignItems="center">
                <Typography variant="h5">외출현황 : 25대</Typography>
                <ToggleSwitch show={show} setShow={setShow} tableName="showOutingTable" />
              </Grid>
              {show.showOutingTable && <StatusBox type="외출" />}
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Grid container justifyContent="space-around" alignItems="center">
                <Typography marginLeft={1} variant="h5">
                  오늘입차 : {parkings.length}대
                </Typography>

                <Typography variant="h5">오늘출차 : {exitedCar.length}대</Typography>
                <ToggleSwitch show={show} setShow={setShow} tableName="showParkinglotTable" />
              </Grid>

              {show.showParkinglotTable && <StatusBox purpose="주차구역" />}
            </Grid>

            <Grid item xs={12}>
              <CarInfoTable />
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
