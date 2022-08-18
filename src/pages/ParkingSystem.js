import * as Yup from 'yup';
import { faker } from '@faker-js/faker';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Container, Typography, Stack } from '@mui/material';

// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
// sections
import { StatusBox } from 'src/sections/parkingSystem';

import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  AppTasks,
} from 'src/sections/@dashboard/app';
import { FormProvider, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ParkingSystem() {
  const theme = useTheme();
  const parkingTicketSchema = Yup.object().shape({
    ticketNumber: Yup.string().required('번호를 입력해주세요'),
    name: Yup.string(),
    carNumber: Yup.string().required('차량번호를 입력해주세요').min(4, '4자리이상은 입력해주세요'),
    parkinglotNumber: Yup.string().required('번호를 입력해주세요'),
  });

  const defaultValues = {
    ticketNumber: '',
    carNumber: '',
  };

  const methods = useForm({
    resolver: yupResolver(parkingTicketSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log('data', data);
  };

  return (
    <Page title="ParkingSystem">
      <Container maxWidth="xl">
        <Grid container spacing={3} textAlign="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5">요청현황</Typography>
            <StatusBox />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5">출차현황</Typography>
            <StatusBox />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5">외출현황</Typography>
            <StatusBox />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Typography marginLeft={1} marginRight={9} variant="h5">
                오늘입차 : 50대
              </Typography>
              <Typography variant="h5">오늘출차 : 25대</Typography>
            </Grid>

            <StatusBox purpose="주차구역" />
          </Grid>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                mt: 5,
                ml: {
                  xs: 10,
                  md: 25,
                },
              }}
            >
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h5" mb={1}>
                  티켓번호
                </Typography>
                <RHFTextField name="ticketNumber" label="티켓번호을 기입해주세요." />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h5" mb={1}>
                  이름
                </Typography>
                <RHFTextField name="name" label="이름을 기입해주세요." />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h5" mb={1}>
                  차량번호
                </Typography>
                <RHFTextField name="carNumber" label="차량번호을 기입해주세요." />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h5" mb={1}>
                  주차구역
                </Typography>
                <RHFTextField name="parkinglotNumber" label="주차구역을 기입해주세요." />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Grid container mt={5}>
                  <Button size="large" variant="contained" color="primary" sx={{ mr: 1 }}>
                    입차
                  </Button>

                  <Button size="large" variant="contained" color="error" sx={{ mr: 1 }}>
                    출차중지
                  </Button>
                  <Button size="large" variant="contained" color="success" sx={{ color: 'white' }}>
                    마감
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </FormProvider>

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
