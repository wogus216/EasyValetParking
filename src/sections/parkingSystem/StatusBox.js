// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Iconify from 'src/components/Iconify';
import { ParkingStatusTable, ParkingAreaTable } from '.';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

StatusBox.propTypes = {
  purpose: PropTypes.string,
  type: PropTypes.string,
};

export default function StatusBox({ purpose, type }) {
  return (
    <>
      <Card
        sx={{
          boxShadow: 0,
          textAlign: 'center',
        }}
      >
        {purpose === '주차구역' && <ParkingAreaTable />}
        {purpose !== '주차구역' && type === '요청' && <ParkingStatusTable />}
        {purpose !== '주차구역' && type === '출차' && <ParkingStatusTable btnText="완료" />}
        {purpose !== '주차구역' && type === '외출' && <ParkingStatusTable btnText="복귀" />}
      </Card>
    </>
  );
}
