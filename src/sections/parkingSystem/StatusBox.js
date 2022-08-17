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
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function StatusBox({ color = 'primary', purpose, sx, ...other }) {
  return (
    <>
      <Card
        sx={{
          boxShadow: 0,
          textAlign: 'center',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        {purpose === '주차구역' && <ParkginglotTable />}
        {purpose !== '주차구역' && <ParkingStatusTable />}
      </Card>
    </>
  );
}
