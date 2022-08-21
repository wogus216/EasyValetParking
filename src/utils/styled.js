import { styled, Button } from '@mui/material';

export const StyledButtonPrimary = styled(Button)(({ theme, width, height }) => ({
  background: theme.palette.gradients.primary,
  color: theme.palette.common.white,
  width,
  height,
}));

export const StyledButtonSuccess = styled(Button)(({ theme, width, height }) => ({
  background: theme.palette.gradients.success,
  color: theme.palette.common.white,
  width,
  height,
}));

export const StyledButtonError = styled(Button)(({ theme, width, height }) => ({
  background: theme.palette.gradients.error,
  color: theme.palette.common.white,
  width,
  height,
}));
