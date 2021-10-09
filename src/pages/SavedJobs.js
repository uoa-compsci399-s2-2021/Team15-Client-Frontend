import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

import CardCustom from '../components/CardCustom';
import CompanyLogo from '../components/CompanyLogo';

const useStyles = makeStyles((theme) => ({
  // root: { flexGrow: 1 },
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
      minHeight: 200,
    },
    // '& *': {
    //   color: 'white',
    // },
    '& label.MuiFormLabel-root.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid white',
    },
  },

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
  },
}));

export default function SavedJobs(props) {
  useEffect(() => {
    document.title = 'Saved Jobs';
  }, []);

  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
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

  useEffect(() => {
    // console.log(props);
    if (props.items !== null) {
      const savedJobs = [];
      if (Object.keys(props.userData).length !== 0) {
        for (let i = 0; i < props.userData.savedJobList.length; i++) {
          const jobId = props.userData.savedJobList[i];
          const data = props.items.filter((job) => job._id === jobId)[0];
          if (data) {
            savedJobs.push(data);
          }
        }
      }
      setItems(savedJobs);
    }
  }, [props.items, props.userData]);

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
  // console.log(props);
  return (
    // <Card>
    //   <Grid container direction="column">
    //     <Grid container direction="row">
    //       <Grid item sx={{ flexGrow: 1, width: '50vw' }}>
    //         <Typography variant="h2">About Us</Typography>
    //         <Box>
    //           <CompanyLogo companyName="UniversityOfAuckland" />
    //         </Box>
    //       </Grid>
    //       <Grid item>b</Grid>
    //     </Grid>
    //     <Grid container direction="row">
    //       <Grid item>c</Grid>
    //       <Grid item>d</Grid>
    //     </Grid>
    //   </Grid>
    // </Card>
    <Box className={classes.root} sx={{ width: '100vw' }}>
      <Box className={classes.ResultHead}>
        <Grid xs={8}>
          <Typography
            variant="h5"
            style={{
              fontFamily: 'Oswald',
              flexGrow: 1,
              verticalAlign: 'bottom',
              color: 'White',
            }}
          >
            You have saved {items.length} Jobs
          </Typography>
        </Grid>
        <Grid xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Sort Jobs</InputLabel>

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
              userData={props.userData}
              handleUpdate={props.handleUpdate}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
