import React from 'react';
import * as Yup from 'yup';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography, Grid } from '@mui/material';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { StyledButtonPrimary, StyledButtonSuccess, StyledButtonError } from 'src/utils/styled';
import { parkingAreaConvert } from 'src/utils/function';
import { numberReg } from 'src/utils/regEx';
import { useDispatch, useSelector } from 'react-redux';
import { getParkings, getVipName, postParkingTicket } from 'src/redux/slice/parking';

const PakringForm = () => {
  const dispatch = useDispatch();
  const { vipData } = useSelector((state) => state.parkings);
  const parkingTicketSchema = Yup.object().shape({
    ticketNumber: Yup.string()
      .required('번호를 입력해주세요')
      .matches(numberReg, { message: '숫자만 입력가능합니다.' }),
    customerName: Yup.string(),
    carNumber: Yup.string().required('차량번호를 입력해주세요').min(4, '4자리이상은 입력해주세요'),
    parkingArea: Yup.string().required('번호를 입력해주세요'),
  });

  const defaultValues = {
    ticketNumber: '',
    customerName: '',
    carNumber: '',
    parkingArea: '',
  };

  const methods = useForm({
    resolver: yupResolver(parkingTicketSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log('data', data);
    const afterConvertParkingArea = parkingAreaConvert(data.parkingArea);
    const newData = { ...data, parkingArea: afterConvertParkingArea };
    if (!afterConvertParkingArea) {
      setValue('parkingArea', '');
      alert('주차구역을 다시입력해주세요 ');
    } else {
      console.log('newData==>', newData);
      dispatch(postParkingTicket(newData));
      dispatch(getParkings());
    }
  };

  const vipNameSearch = async (e) => {
    console.log('value', e.target.value);
    const customerNameValue = e.target.value;
    console.log('tmp==>', customerNameValue.length);
    if (customerNameValue.length >= 3) {
      dispatch(getVipName(e.target.value));
      console.log('vipData2==>', vipData);
      // setValue('carNumber', vipData[0].car_number);
    }
  };
  const vipCarNumber = async (e) => {
    console.log('value', e.target.value);
    const carNumberValue = e.target.value;
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

          <RHFTextField name="customerName" label="이름을 기입해주세요." onBlur={vipNameSearch} />
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
          <RHFTextField name="parkingArea" label="주차구역을 기입해주세요." />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grid container mt={5}>
            <StyledButtonPrimary type="submit" width={100} height={50} sx={{ mr: 1 }}>
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
