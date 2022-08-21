// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Iconify from 'src/components/Iconify';
import { ParkingStatusTable, ParkginglotTable } from '.';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

StatusBox.propTypes = {
  color: PropTypes.string,
  purpose: PropTypes.string,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
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
        {purpose === '주차구역' && <ParkginglotTable />}
        {purpose !== '주차구역' && type === '요청' && <ParkingStatusTable />}
        {purpose !== '주차구역' && type === '출차' && <ParkingStatusTable btnText="완료" />}
        {purpose !== '주차구역' && type === '외출' && <ParkingStatusTable btnText="복귀" />}
      </Card>
    </>
  );
}
