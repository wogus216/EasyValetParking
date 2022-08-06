import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    nickName: Yup.string().required('닉네임을 입력해주세요.'),
    email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요'),
    password: Yup.string().required('비밀번호를 입력해주세요.').min(5, '비밀번호는 최소 5자리 이상입니다.'),
    passwordCheck: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .min(5, '비밀번호는 최소 5자리 이상입니다.')
      .oneOf(['password'], '비밀번호가 일치하지 않습니다.'),
    department: Yup.string().required('부서를 선택해주세요.'),
    hotel: Yup.string().required('호텔을 선택해주세요.'),
  });

  const defaultValues = {
    nickName: '',
    email: '',
    password: '',
    passwordCheck: '',
    department: '',
    hotel: '',
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
          <RHFTextField name="nickName" label="닉네임(한영상관없어요)" />
        </Stack>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="비밀번호 입력(최소5자리)"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />{' '}
        <RHFTextField name="passwordCheck" label="비밀번호 확인" type={showPassword ? 'text' : 'password'} />
        <RHFSelect name="department" label="부서선택" arr={['FS', 'FD', 'GSC', 'F&B', 'ETC']} />
        <RHFSelect name="hotel" label="호텔선택" arr={['파크하얏트']} />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          회원가입
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
