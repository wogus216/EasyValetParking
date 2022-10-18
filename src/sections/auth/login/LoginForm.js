import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// text
import text from 'src/utils/text';
import { passwordReg } from 'src/utils/regEx';
// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import { useAuth, useSnack } from 'src/hooks/useAuth';
import MySnackbar from 'src/components/Snackbar';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loginForm } = text;
  const [snackOpen, actions] = useSnack();
  const [state, setState] = useState({
    loginSuccess: false,
    loginSuccessMent: '로그인 성공했습니다.',
  });

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요'),
    password: Yup.string().required('비밀번호를 입력해주세요.').min(5, '비밀번호는 최소 5자리 이상입니다.'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: false,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const newData = { ...data, department: 0 };
    console.log('data', newData);
    try {
      const response = await login(newData);
      console.log('response==>', response);

      setState({ ...state, loginSuccess: true });

      navigate('/dashboard/parking-system');
    } catch (error) {
      console.log('error', error.response);

      setState({ ...state, loginSuccessMent: '로그인에 실패했습니다.' });
    }
    actions.handleOpen();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <MySnackbar message={state.loginSuccessMent} open={snackOpen} severity={state.loginSuccess} />
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label={loginForm.ment1} /> */}
        <Link variant="subtitle2" underline="hover" to="/reset-password" component={RouterLink}>
          비밀번호 찾기
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        {loginForm.ment2}
      </LoadingButton>
    </FormProvider>
  );
}
