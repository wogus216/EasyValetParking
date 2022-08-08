import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFMultiTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFMultiTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          id="outlined-multiline-static"
          fullWidth
          multiline
          rows={3}
          onChange={onChange}
          value={value}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
