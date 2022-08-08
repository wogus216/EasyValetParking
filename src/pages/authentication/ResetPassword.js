import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';

// components
import Page from 'src/components/Page';

import SentIcon from 'src/asset/icon_sent';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// 텍스트
import text from 'src/utils/text';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { resetPassword } = text;
  const passwordSchema = Yup.object().shape({
    email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(passwordSchema),
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
    <Page title="ResetPassword">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RootStyle title="Reset Password | Minimal UI">
          <LogoOnlyLayout />
          <Container>
            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              <Box>
                <SentIcon sx={{ mb: 10, mx: 'auto', height: 160 }} />
                <Typography variant="h3" paragraph>
                  {resetPassword.ment1}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>{resetPassword.ment2}</Typography>
                <Stack spacing={3}>
                  <RHFTextField name="email" label="이메일을 입력해주세요." />
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    {resetPassword.ment3}
                  </LoadingButton>
                </Stack>
                <Button fullWidth size="large" sx={{ mt: 1 }}>
                  <Link variant="subtitle2" underline="hover" to="/login" component={RouterLink}>
                    {resetPassword.ment4}
                  </Link>
                </Button>
              </Box>
            </Box>
          </Container>
        </RootStyle>
      </FormProvider>
    </Page>
  );
}
