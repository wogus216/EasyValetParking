import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  InputProps: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          id={name}
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
