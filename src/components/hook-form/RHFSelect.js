import { Controller, useFormContext } from 'react-hook-form';
import { InputLabel, Select, FormControl } from '@mui/material';

export default function RHFSelect({ name, label, defaultValue, children, ...props }) {
  const labelId = `${name}-label`;
  const { control } = useFormContext();
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        as={
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        }
      />
    </FormControl>
  );
}
