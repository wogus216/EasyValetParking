import * as React from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ToggleSwitch = ({ show, setShow, tableName }) => {
  const { showOutingTable, showParkinglotTable } = show;
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    if (tableName === 'showOutingTable') {
      setShow((show) => ({
        ...show,
        showOutingTable: Boolean(!showOutingTable),
      }));
    } else {
      setShow((show) => ({
        ...show,
        showParkinglotTable: Boolean(!showParkinglotTable),
      }));
    }
  };

  return (
    <FormControlLabel control={<Switch checked={checked} onChange={handleChange} name={tableName} />} label="숨기기" />
  );
};
export default ToggleSwitch;

ToggleSwitch.propTypes = {
  show: PropTypes.object,
  setShow: PropTypes.func,
  tableName: PropTypes.string,
};
