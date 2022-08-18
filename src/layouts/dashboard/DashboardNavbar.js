import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Grid, Stack, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { fDateTime } from 'src/utils/formatTime';
// responsive
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from '../../components/Iconify';
//

import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------
const DRAWER_WIDTH = 105;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const mdUp = useResponsive('up', 'md');
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, mb: 1, color: 'text.primary' }}>
          {/* 햄버거 */}
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} textAlign="center">
            <Typography color="black" variant="h4">
              {fDateTime(new Date())}
            </Typography>
          </Grid>
          {mdUp && (
            <>
              <Grid item md={4} textAlign="center">
                <Typography color="black" variant="h4">
                  날씨
                </Typography>
              </Grid>

              <Grid item md={4}>
                <Typography color="black" variant="h4" align="center">
                  현재 : 50대
                </Typography>
              </Grid>
            </>
          )}
        </Grid>

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
