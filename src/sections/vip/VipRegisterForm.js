import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// function
import { nameReg, numberReg, capitalReg } from 'src/utils/regEx';
// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFSelect, RHFTextField, RHFMultiTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function VipRegisterForm() {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('이름을 기입해주세요.').matches(nameReg, { message: '한글또는 영어만 기입해주세요.' }),
    carNumber: Yup.string()
      .required('차량번호를 기입해주세요.')
      .matches(numberReg, { message: '숫자만 기입해주세요.' })
      .min(4, '최소 4자리이상입니다.'),
    carBrand: Yup.string()
      .required('차량브랜드를 기입해주세요.')
      .matches(capitalReg, { message: '대문자만 기입해주세요.' }),
    group: Yup.string().required('소속을 선택해주세요.'),
    specialNote: Yup.string().matches(nameReg, { message: '한글또는 영어만 기입해주세요.' }),
  });

  const defaultValues = {
    name: '',
    carNumber: '',
    carBrand: '',
    group: '',
    specialNote: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="이름을 기입해주세요." />
        </Stack>
        <RHFTextField name="carNumber" label="차량번호를 기입해주세요(번호만)." />
        {/* 무조건 영어로 기입 나중에 넘겨줄때 대문자 처리하기 */}
        <RHFTextField name="carBrand" label="차량브랜드를 기입해주세요(영어 대문자로 입력해주세요)." />
        <RHFSelect name="group" label="소속을 선택해주세요." arr={['파크클럽', 'HDC', 'ETC']} />
        <RHFMultiTextField name="specialNote" label="특이사항을 기입해주세요" />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          회원가입
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
