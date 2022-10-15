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
import { useAuth, useSnack } from 'src/hooks/useAuth';

// api
import { emailCheck } from 'src/utils/api';
// 스낵바
import MySnackbar from 'src/components/Snackbar';
import { useNavigate } from 'react-router-dom';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigte = useNavigate();
  const [snackOpen, actions] = useSnack();
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    emailCheck: false,
    emailSuccess: '',
    emailMent: '',
    registerSuccess: false,
    registerCheckMent: '회원가입에 성공했습니다.',
  });

  const RegisterSchema = Yup.object().shape({
    nickname: Yup.string()
      .required('닉네임을 입력해주세요.')
      .matches(nameReg, { message: '한글또는 영어만 입력해주세요.' }),
    email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요'),
    password: Yup.string().required('비밀번호를 입력해주세요.').min(5, '비밀번호는 최소 5자리 이상입니다.'),
    passwordCheck: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .min(5, '비밀번호는 최소 5자리 이상입니다.'),
    department: Yup.string().required('부서를 선택해주세요.'),
    // hotel: Yup.string().required('호텔을 선택해주세요.'),
  });

  const defaultValues = {
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
    department: '',
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailCheck = async () => {
    const email = getValues('email');
    console.log('email', email);

    setOpen(true);

    try {
      const response = await emailCheck(email);
      console.log('response===>', response);
      if (response.data === '해당 이메일로 회원가입 가능') {
        setState({ ...state, emailCheck: true, emailMent: '가입 가능한 이메일입니다.', emailSuccess: true });
      }
      if (response.data.data.status === 400) {
        setState({ ...state, emailCheck: true, emailMent: '중복된 이메일입니다.', emailSuccess: false });
      }
    } catch (error) {
      console.log('error', error.response);
    }
  };
  console.log('emailCheck==>', state);

  const onSubmit = async (data) => {
    console.log('data', data);
    if (state.emailCheck === false) {
      setOpen(true);
      setState({ ...state, emailMent: '이메일 중복체크 먼저 해주세요.' });
    } else {
      try {
        const response = await register(data);
        console.log('response==>', response);
        if (!response.success) {
          setState({ ...state, registerCheckMent: '회원가입에 실패했습니다.' });
        } else {
          setState({ ...state, registerSuccess: true });
        }

        actions.handleOpen();
        navigte('/login');
      } catch (error) {
        console.log('error', error);
        console.log('error', error.response);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <MySnackbar message={state.registerCheckMent} open={snackOpen} severity={state.registerSuccess} />
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
            onClose={handleClose}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            fullWidth
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
            {state.emailCheck && state.emailSuccess && <Alert severity="success">{state.emailMent}</Alert>}
            {state.emailCheck && !state.emailSuccess && <Alert severity="error">{state.emailMent}</Alert>}
          </Dialog>
        </Stack>
        <RHFTextField
          name="password"
          label="최소 5자리를 입력해주세요."
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
