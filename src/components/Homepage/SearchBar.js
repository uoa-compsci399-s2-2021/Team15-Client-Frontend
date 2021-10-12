import { React, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiMenuItem-root': {
      minHeight: 200,
    },
    '& *': {
      color: '#003866',
    },
    '& label.MuiFormLabel-root.Mui-focused': {
      color: '#003866',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #003866',
    },
    '& .MuiInput-underline': {
      borderBottom: '2px solid #888',
    },
  },
  textField: {
    width: 230,
    height: 60,
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
    marginTop: 10,
    width: 100,
    padding: 10,
    '&:hover': {
      backgroundColor: '#98BDDD',
    },
  },
  marginT5: {
    marginTop: 5,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 130,
    borderRight: '2px solid #98BDDD',
    paddingRight: 5,
    height: 60,
  },
}));
/** THis is a search Bar Currently it only Console logs out the form value  */
export default function SearchBar({ searchQuery, onClickSearchResult }) {
  const classes = useStyles();
  const intSalaryValues = [
    0,
    10000,
    20000,
    30000,
    40000,
    50000,
    60000,
    70000,
    80000,
    90000,
    -1,
  ];
  const contractList = [
    'Full Time',
    'Part Time',
    'Permanent',
    'Fix Term',
    'Casual',
  ];
  const locationList = [
    'Auckland',
    'Wellington',
    'Christchurch',
    'Remote',
    'Other',
  ];
  const startSList = [
    '$0',
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

  const handleInputChange = (e) => {
    e.preventDefault();
    searchQuery[1]({ ...searchQuery[0], [e.target.name]: e.target.value });
  };
  const onClickListAll = () => {
    searchQuery[1]({
      ...searchQuery[0],
      beforeSearch: false,
      searchDone: false,
      listAll: true,
    });
  };
  const menuProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    getContentAnchorEl: null,
  };

  return (
    <form className={classes.root}>
      <Grid container direction="row" className={classes.gridContainer}>
        <Grid item className={classes.margin10}>
          <Typography
            style={{
              paddingRight: 10,
              color: 'transparent',
              height: 60,
            }}
          />
        </Grid>
        <Grid item className={classes.margin10}>
          <TextField
            className={classes.textField}
            style={{ borderRight: '2px solid #98BDDD', paddingRight: 10 }}
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
                value={searchQuery[0].startingSalary}
                onChange={(e) => handleInputChange(e)}
                MenuProps={menuProps}
              >
                {startSList.map((item, index) => (
                  <MenuItem
                    key={item}
                    value={intSalaryValues[index]}
                    style={{ height: '40px' }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel> Highest Salary</InputLabel>
              <Select
                value={searchQuery[0].highestSalary}
                name="highestSalary"
                onChange={(e) => handleInputChange(e)}
                MenuProps={menuProps}
              >
                {HighSList.map((item, index) => (
                  <MenuItem
                    key={item}
                    value={intSalaryValues[index]}
                    style={{ height: '40px' }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item className={classes.margin10}>
          <FormControl className={classes.formControl}>
            <InputLabel>Contract Type</InputLabel>
            <Select
              multiple
              value={searchQuery[0].contract}
              name="contract"
              onChange={(e) => handleInputChange(e)}
              MenuProps={menuProps}
            >
              {contractList.map((item) => (
                <MenuItem key={item} value={item} style={{ height: '40px' }}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item className={classes.margin10}>
          <FormControl className={classes.formControl}>
            <InputLabel>Location</InputLabel>

            <Select
              multiple
              value={searchQuery[0].location}
              id="Location"
              label="Location"
              name="location"
              onChange={(e) => handleInputChange(e)}
              MenuProps={menuProps}
            >
              {locationList.map((item) => (
                <MenuItem key={item} value={item} style={{ height: '40px' }}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Button
          color="primary"
          justifycontent="center"
          className={classes.SearchButton}
          name="search"
          onClick={onClickSearchResult}
          // variant="outlined"
        >
          Search
        </Button>
        {/* <Button
          color="secondary"
          justifycontent="center"
          className={classes.SearchButton}
          name="listAll"
          onClick={onClickListAll}
          style={{ marginLeft: 10 }}
        >
          List All
        </Button> */}
      </Grid>
    </form>
  );
}
