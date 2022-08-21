import React from 'react';
import * as Yup from 'yup';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography, Grid, Button, styled } from '@mui/material';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { StyledButtonPrimary, StyledButtonSuccess, StyledButtonError } from 'src/utils/styled';

const ButtonStyle = styled(Button)({
  width: 100,
  height: 50,
  textAlign: 'center',
});

const PakringForm = () => {
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={3}
        mb={3}
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
            <StyledButtonPrimary width={100} height={50} sx={{ mr: 1 }}>
              입차
            </StyledButtonPrimary>

            <StyledButtonError width={100} height={50} sx={{ mr: 1 }}>
              출차중지
            </StyledButtonError>
            <StyledButtonSuccess width={100} height={50}>
              마감
            </StyledButtonSuccess>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
};

export default PakringForm;
