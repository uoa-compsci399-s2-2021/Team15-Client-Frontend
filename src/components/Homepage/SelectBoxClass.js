import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginInlineEnd: 10,
    marginTop: 5,
  },
}));

export default function SelectBoxSalary(props) {
  const classes = useStyles();

  const [Value, SetValue] = React.useState('');

  const handleChange = (event) => {
    SetValue(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-salary-range-label">
          Classification
        </InputLabel>
        <Select
          id="simple-select-salary-range"
          value={Value}
          onChange={handleChange}
        >
          <MenuItem aria-label="Class" value={0} />
          <MenuItem value={1}>UnderGraduate</MenuItem>
          <MenuItem value={2}>Graduate</MenuItem>
          <MenuItem value={3}>Masters</MenuItem>
          <MenuItem value={4}>PHD</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
