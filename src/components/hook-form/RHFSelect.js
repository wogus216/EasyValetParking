import PropTypes from 'prop-types';
import { InputLabel, Select, FormControl, MenuItem, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

RHFSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  arr: PropTypes.array,
};

export default function RHFSelect({ name, label, arr }) {
  console.log('arr', arr);
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel error={error} id="demo-simple-select-label">
            {label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="부서선택"
            onChange={onChange}
            error={error}
          >
            {arr.map((data, i) => (
              <MenuItem key={i} value={i}>
                {data}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={error}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
