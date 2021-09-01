import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Slider, Box, Button } from '@material-ui/core';
import SelectBoxSalary from './SelectBoxSalary';
import SelectBoxClass from './SelectBoxClass';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 250,
  },
  gridContainer: {
    margin: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin10: {
    marginInlineEnd: 10,
    marginTop: 5,
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
      <Grid item className={classes.margin10}>
        <TextField
          className={classes.textField}
          id="Search"
          label="What Are You Looking For?"
        />
      </Grid>
      <Grid item>
        <Grid container direction="row">
          <SelectBoxSalary labelName="Starting Salary" />
          <SelectBoxSalary labelName="Highest Salary" />
        </Grid>
      </Grid>
      <Grid item className={classes.margin10}>
        <SelectBoxClass />
      </Grid>

      <Grid item className={classes.margin10}>
        <TextField
          className={classes.textField}
          id="Location"
          label="Location (Suburb/ City/ Country)"
        />
      </Grid>
      <Button variant="outline" color="primary" justifyContent="center" style={{ fontFamily: 'Oswald' }}>
        Search
      </Button>
    </Grid>
  );
}
