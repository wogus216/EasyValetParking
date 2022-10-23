import { styled, Button } from '@mui/material';

export const StyledButtonPrimary = styled(Button)(({ theme, width, height }) => ({
  border: '1px solid',
  borderColor: theme.palette.primary.main,
  color: theme.palette.common.black,
  width,
  height,
  '&:hover': {
    color: theme.palette.common.white,
    background: theme.palette.gradients.primary,
  },
}));

export const StyledButtonInfo = styled(Button)(({ theme, width, height }) => ({
  color: theme.palette.common.black,
  border: '1px solid',
  borderColor: theme.palette.info.main,
  width,
  height,
  '&:hover': {
    color: theme.palette.common.white,
    background: theme.palette.gradients.info,
  },
}));

export const StyledButtonSuccess = styled(Button)(({ theme, width, height }) => ({
  color: theme.palette.common.black,
  border: '1px solid',
  borderColor: theme.palette.success.main,
  width,
  height,
  '&:hover': {
    color: theme.palette.common.white,
    background: theme.palette.gradients.success,
  },
}));

export const StyledButtonError = styled(Button)(({ theme, width, height }) => ({
  color: theme.palette.common.black,
  border: '1px solid',
  borderColor: theme.palette.error.main,
  width,
  height,
  '&:hover': {
    color: theme.palette.common.white,
    background: theme.palette.gradients.error,
  },
}));
