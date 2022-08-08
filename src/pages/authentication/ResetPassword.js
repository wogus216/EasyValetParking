import * as Yup from 'yup';
import { useState } from 'react';

// material
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';

// components
import Page from 'src/components/Page';

import SentIcon from 'src/asset/icon_sent';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';

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
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

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
              {!sent ? (
                <>
                  <Typography variant="h3" paragraph>
                    Forgot your password?
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                    Please enter the email address associated with your account and We will email you a link to reset
                    your password.
                  </Typography>
                  <Stack spacing={3}>
                    <RHFTextField name="email" label="Email address" />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                      보내기
                    </LoadingButton>
                  </Stack>
                  <Button fullWidth size="large" sx={{ mt: 1 }}>
                    Back
                  </Button>
                </>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                  <Typography variant="h3" gutterBottom>
                    Request sent successfully
                  </Typography>
                  <Typography>
                    We have sent a confirmation email to &nbsp;
                    <strong>{email}</strong>
                    <br />
                    Please check your email.
                  </Typography>

                  <Button size="large" variant="contained" sx={{ mt: 5 }}>
                    Back
                  </Button>
                </Box>
              )}
            </Box>
          </Container>
        </RootStyle>
      </FormProvider>
    </Page>
  );
}
