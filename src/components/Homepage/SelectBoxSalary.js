import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { MenuItem } from "@material-ui/core";

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

  const [Value, SetValue] = React.useState("");

  const handleChange = (event) => {
    SetValue(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-salary-range-label">
          {props.labelName}
        </InputLabel>
        <Select
          id="simple-select-salary-range"
          value={Value}
          onChange={handleChange}
        >
          <MenuItem aria-label="Minimum" value={0} />
          <MenuItem value={40000}>$40,000</MenuItem>
          <MenuItem value={50000}>$50,000</MenuItem>
          <MenuItem value={60000}>$60,000</MenuItem>
          <MenuItem value={70000}>$70,000</MenuItem>
          <MenuItem value={80000}>$80,000</MenuItem>
          <MenuItem value={90000}>$90,000</MenuItem>
          <MenuItem value={100000}>$100,000</MenuItem>
          <MenuItem value={"Max"}>$100,000+</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
