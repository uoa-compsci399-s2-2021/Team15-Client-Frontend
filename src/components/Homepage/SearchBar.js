import React from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Slider, Box, Button } from '@material-ui/core';
import SelectBoxSalary from './SelectBoxSalary';
import SelectBoxClass from './SelectBoxClass';

const useStyles = makeStyles((theme) => ({
  container:
  {
    flexGrow: 1,
    margin: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
  textField:
  {
    width: 250,
  },
  gridContainer:
  {
    margin: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  StartingSalary: {
    width: 140,
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function SearchBar() {
  const classes = useStyles();
  const [startingSalaryIn, setstartingSalaryIn] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container direction="row" className={classes.gridContainer}>
      <TextField className={classes.textField}
        id="Search"
        label="What Are You Looking For?"
      />
      <SelectBoxSalary labelName="Starting Salary" />
      <SelectBoxSalary labelName="Highest Salary" />
      <SelectBoxClass />
      <TextField className={classes.textField}
        id="Location"
        label="Location (Suburb/ City/ Country)"
      />
      <Button variant="contained" color="primary">Search</Button>
    </Grid>
  );
}
