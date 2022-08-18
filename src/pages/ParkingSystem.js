// @mui

import { Grid, Container, Typography } from '@mui/material';

// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
// sections
import { PakringForm, StatusBox } from 'src/sections/parkingSystem';

import { AppTrafficBySitem, AppTasks, AppTrafficBySite } from 'src/sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function ParkingSystem() {
  return (
    <Page title="ParkingSystem">
      <Container maxWidth="xl">
        <PakringForm />
        <Grid container spacing={3} textAlign="center">
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5">요청현황</Typography>
            <StatusBox />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5">출차현황</Typography>
            <StatusBox />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5">외출현황</Typography>
            <StatusBox />
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <Grid container>
              <Typography marginLeft={1} variant="h5">
                오늘입차 : 50대
              </Typography>
              <Typography variant="h5">오늘출차 : 25대</Typography>
            </Grid>

            <StatusBox purpose="주차구역" />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
