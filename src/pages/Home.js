import { makeStyles, Grid, CssBaseline, Box } from '@material-ui/core';
import { React, useState } from 'react';

import SideBar from '../components/Homepage/SideBar';
import SearchSection from '../components/Homepage/SearchSection';
import JobListingBottom from '../components/Homepage/JobListingBottom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    hieght: '100%',
    margin: 0,
    padding: '0.1%',
  },
  loginButton: {
    font: 'montserrat',
    color: 'White',
    backgroundColor: '#009AC7',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Home() {
  const classes = useStyles();
  document.title = 'Home';
  return (
    <Grid container direction="row" spacing={3} className={classes.root}>
      <CssBaseline />
      <Grid item xs={1}>
        <SideBar />
      </Grid>
      <Grid item xs={11}>
        <SearchSection />
      </Grid>
      <Grid container direction="row" spacing={3} className={classes.root}>
        <JobListingBottom />
      </Grid>
    </Grid>
  );
}
export default Home;
