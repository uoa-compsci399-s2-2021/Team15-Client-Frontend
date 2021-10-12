import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {
  Box,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

import CardCustom from '../CardCustom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '80vw',
    margin: 'auto',
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
    paddingTop: 10,
    marginTop: 10,
    '&.MuiMenuItem-root': {
      minheight: 200,
    },
    '& .MuiInput-underline': {
      borderBottom: '2px solid #888',
    },
    '& label.MuiFormLabel-root.Mui-focused': {
      color: '#003866',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #003866',
    },
  },
  CardCustom: {},
  SearchResultsContainer: {},
  ResultHead: {
    display: 'flex',
    // flexWrap: "wrap",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
    // paddingBottom: 10,
  },
  formControl: {
    minWidth: 130,
    // width: "15%",
    float: 'right',
    paddingBottom: 10,
    '&.MuiSelect-root, .MuiSelect-filled, .MuiSelect-standard': {
      borderRadius: 5,
      backgroundColor: 'white',
    },
  },
  back: {
    color: '#003866',
    '&:hover': { backgroundColor: '#98BDDD' },
    marginBottom: 10,
    paddingRight: 20,
    fontFamily: 'Oswald',
    fontSize: 15,
  },
  inputLabel: {
    color: 'white',
  },
}));

SearchResultsSection.defaultProps = {
  searchQuery: {
    jobTitle: '',
    startingSalary: '',
    highestSalary: '',
    contract: [],
    location: [],
    beforeSearch: false,
    searchDone: false,
    listAll: false,
  },
  searchResults: false,
};
export default function SearchResultsSection({
  searchQuery,
  setSearchQuery,
  userData,
  handleUpdate,
  searchResults,
}) {
  const classes = useStyles();
  const [SortValue, setSortValue] = useState('');
  const SortList = ['Date', 'Alphabetically'];
  const colors = [
    '#f39400',
    '#b14550',
    '#9cb279',
    '#9b5873',
    '#647fb5',
    '#98719d',
    '#6c6671',
    '#89adca',
  ];
  // fetch Data
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
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

  const handleSortChange = (e) => {
    setSortValue(e.target.value);

    if (e.target.value === 'Date') {
      setItems(
        items.sort((obj1, obj2) => {
          if (obj1.jobStartTime < obj2.jobStartTime) return -1;
          if (obj1.jobStartTime > obj2.jobStartTime) return 1;
          return 0;
        }),
      );
    }
    if (e.target.value === 'Alphabetically') {
      items.sort((obj1, obj2) => {
        if (obj1.positionName < obj2.positionName) return -1;
        if (obj1.positionName > obj2.positionName) return 1;
        return 0;
      });
    }
  };

  const filterListing = (value) => {
    if (!value.isActive) return false;
    if (searchQuery.listAll) return true;

    const PName = value.positionName
      .toLowerCase()
      .trim()
      .includes(searchQuery.jobTitle.toLowerCase().trim())
      || value.companyName
        .toLowerCase()
        .trim()
        .includes(searchQuery.jobTitle.toLowerCase().trim());
    let LSalary = true;
    let HSalary = true;
    if (value.jobSalaryType === 'Annual') {
      if (
        searchQuery.startingSalary !== ''
        && searchQuery.startingSalary !== -1
      ) {
        LSalary = value.jobSalary >= searchQuery.startingSalary;
      }
      if (
        searchQuery.highestSalary !== ''
        && searchQuery.highestSalary !== -1
        && searchQuery.startingSalary !== -1
      ) {
        HSalary = value.jobSalary <= searchQuery.highestSalary;
      }
    }

    let ContractT = true;
    let Hours = true;
    if (searchQuery.contract.length !== 0) {
      ContractT = searchQuery.contract.includes(value.jobHours);
      Hours = searchQuery.contract.includes(value.jobContract);
    }
    let Location = true;

    if (searchQuery.location.length !== 0) {
      Location = searchQuery.location.includes(value.jobLocation);

      const Other = searchQuery.location.includes('Other')
        ? !['Auckland', 'Christchurch', 'Wellington', 'Remote'].includes(
          value.jobLocation,
        )
        : null;

      Location = Location || Other;
    }

    return PName && HSalary && LSalary && (ContractT || Hours) && Location;
  };

  useEffect(() => {
    const fetchJobInfo = async () => {
      await fetch('https://cs399-team15.herokuapp.com/api/admin/get-job-info')
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.filter(filterListing).reverse());
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          },
        );
    };
    fetchJobInfo();
    setSearchQuery({ ...searchQuery, searchDone: true });
  }, [searchQuery.searchDone]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Box className={classes.root} sx={{ width: '100vw' }}>
      {searchResults ? (
        <Button
          variant="outlined"
          onClick={() => setSearchQuery({
            jobTitle: '',
            startingSalary: '',
            highestSalary: '',
            contract: [],
            location: [],
            beforeSearch: true,
            searchDone: false,
            listAll: false,
          })}
          size="small"
          className={classes.back}
          sx={{
            color: '#003866',
            '&:hover': { Color: '#98BDDD' },
          }}
        >
          <ArrowBackIosIcon fontSize="small" style={{ color: '#003866' }} />
          back
        </Button>
      ) : null}
      <Box className={classes.ResultHead}>
        <Grid xs={8}>
          <Typography
            variant="h5"
            style={{
              fontFamily: 'Oswald',
              flexGrow: 1,
              verticalAlign: 'bottom',
              color: '#003866',
            }}
          >
            {searchResults
              ? `Found ${items.length} Jobs Matching Your Search`
              : `Showing ${items.length} Jobs`}
          </Typography>
        </Grid>
        <Grid xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel
              className={classes.inputLabel}
              style={{ color: '#003866' }}
            >
              Sort Jobs
            </InputLabel>

            <Select
              value={SortValue}
              name="sort"
              onChange={(e) => handleSortChange(e)}
              MenuProps={menuProps}
            >
              {SortList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Box>

      <Divider style={{ marginBottom: 10 }} />

      <Grid
        container
        direction="row"
        spacing={1}
        className={classes.SearchResultsContainer}
        spaceing={2}
      >
        {items.map((listing, i) => (
          <Grid
            item
            sm={6}
            md={4}
            xs={12}
            key={`${listing.positionName} search result ${i.toString()}`}
          >
            <CardCustom
              rounded
              item={listing}
              color={colors[i % 8]}
              className={classes.CardCustom}
              userData={userData}
              handleUpdate={handleUpdate}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
