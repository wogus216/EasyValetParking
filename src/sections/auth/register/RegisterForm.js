import * as Yup from 'yup';
import { useState, forwardRef } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Button, Alert, Modal, Dialog, Slide } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// function
import { nameReg, passwordReg } from 'src/utils/regEx';
// hooks
import { useAuth } from 'src/hooks/useAuth';

// api
import { emailCheck } from 'src/utils/api';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const [open, setOpen] = useState(false);

  const RegisterSchema = Yup.object().shape({
    nickname: Yup.string()
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
    nickname: 'sancho',
    email: 'test@nate.com',
    password: 'wo1cns23!',
    passwordCheck: 'wo1cns23!',
    department: 2,
    // hotel: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleEmailCheck = async () => {
    const email = getValues('email');
    console.log('email', email);

    try {
      await emailCheck('test12345@gm.com');
      setOpen((prev) => !prev);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('중복 이메일입니다.');
    }
  };

  const onSubmit = async (data) => {
    console.log('data', data);

    try {
      await register(data);
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="nickname" label="닉네임(한글,영어 상관없습니다.)" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <RHFTextField name="email" label="Email address" />
          <Button sx={{ padding: 0 }} onClick={handleEmailCheck}>
            중복체크
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Iconify icon="ep:close" />
            </IconButton>
            <Alert severity="success">해당 이메일로 가입 가능합니다</Alert>
          </Dialog>
        </Stack>
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
