import PropTypes from 'prop-types';
import { InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

RHFSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  arr: PropTypes.array,
};

export default function RHFSelect({ name, label, arr }) {
  const [department, setDepartment] = useState('');
  const { control } = useFormContext();
  const handleChange = (event) => {
    setDepartment(event.target.value);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl {...field} fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={department}
            label="부서선택"
            onChange={handleChange}
          >
            {arr.map((data, i) => (
              <MenuItem key={i} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
