import { React, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';

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
  SearchButton: {
    fontFamily: 'Oswald',
    marginTop: 15,
  },
  marginT5: {
    marginTop: 5,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
}));
/** THis is a search Bar Currently it only Console logs out the form value  */
export default function SearchBar() {
  const classes = useStyles();
  const intSalaryValues = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, -1];
  const degreeList = ['Any', 'Undergraduate', 'Bachelor', 'Postgraduate', 'Masters', 'Doctorate'];
  const startSList = [
    'Less than $10,000',
    '$10,000',
    '$20,000',
    '$30,000',
    '$40,000',
    '$50,000',
    '$60,000',
    '$70,000',
    '$80,000',
    '$90,000',
    '$100,000+',
  ];
  const [HighSList, setHighSList] = useState(startSList);
  const [SearchQuery, setSearchQuery] = useState({
    jobTitle: '',
    startingSalary: '',
    highestSalary: '',
    class: '',
    location: '',
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchQuery({ ...SearchQuery, [e.target.name]: e.target.value });
  };

  return (
    <Grid container direction="row" className={classes.gridContainer}>
      <Grid item className={classes.margin10}>
        <TextField
          className={classes.textField}
          id="Search"
          label="What Are You Looking For?"
          name="jobTitle"
          onChange={(e) => handleInputChange(e)}
        />
      </Grid>

      <Grid item>
        <Grid container direction="row" className={classes.margin10}>
          <FormControl className={classes.formControl}>
            <InputLabel> Starting Salary</InputLabel>

            <Select
              name="startingSalary"
              value={SearchQuery.startingSalary}
              onChange={(e) => handleInputChange(e)}
            >
              {startSList.map((item, index) => (
                <MenuItem key={item} value={intSalaryValues[index]}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel> Highest Salary</InputLabel>

            <Select
              value={SearchQuery.highestSalary}
              name="highestSalary"
              onChange={(e) => handleInputChange(e)}
            >
              {HighSList.map((item, index) => (
                <MenuItem key={item} value={intSalaryValues[index]}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item className={classes.margin10}>
        <FormControl className={classes.formControl}>
          <InputLabel>Degree</InputLabel>

          <Select value={SearchQuery.class} name="class" onChange={(e) => handleInputChange(e)}>
            {degreeList.map((item, index) => (
              <MenuItem key={item} value={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item className={classes.margin10}>
        <TextField
          className={classes.textField}
          id="Location"
          label="Location (Suburb/ City/ Country)"
          name="location"
          onChange={(e) => handleInputChange(e)}
        />
      </Grid>

      <Button
        color="primary"
        justifycontent="center"
        className={classes.SearchButton}
        name="search"
        onClick={() => {
          console.log(SearchQuery);
        }}
      >
        Search
      </Button>
    </Grid>
  );
}
