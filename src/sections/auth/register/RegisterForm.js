import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// function
import { nameReg, passwordReg } from 'src/utils/regEx';
// hooks
import useAuth from 'src/hooks/useAuth';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const RegisterSchema = Yup.object().shape({
    nickName: Yup.string()
      .required('닉네임을 입력해주세요.')
      .matches(nameReg, { message: '한글또는 영어만 입력해주세요.' }),
    email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요'),
    password: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .matches(passwordReg, {
        message: '문자,숫자,특수문자를 조합해 최소 5자리를 입력해주세요',
      })
      .min(5, '비밀번호는 최소 5자리 이상입니다.'),
    passwordCheck: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .min(5, '비밀번호는 최소 5자리 이상입니다.'),
    department: Yup.string().required('부서를 선택해주세요.'),
    // hotel: Yup.string().required('호텔을 선택해주세요.'),
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
    await register(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="nickName" label="닉네임(한글,영어 상관없습니다.)" />
        </Stack>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="문자,숫자,특수문자를 조합해 최소 5자리를 입력해주세요."
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
        <RHFTextField
          name="passwordCheck"
          label="비밀번호 확인"
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
        <RHFSelect name="department" label="부서선택" arr={['FS', 'FD', 'GSC', 'F&B', 'ETC']} />
        {/* 버전 1에서 사용 안함 */}
        {/* <RHFSelect name="hotel" label="호텔선택" arr={['파크하얏트']} /> */}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          회원가입
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
