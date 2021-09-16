import { makeStyles, Grid, CssBaseline, Box } from '@material-ui/core';
import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SideBarSocialLinks from '../components/Homepage/SideBarSocialLinks';
import SearchSection from '../components/Homepage/SearchSection';
import JobListingBottom from '../components/Homepage/JobListingBottom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    hieght: '100%',
    margin: 0,
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
  JLB: {
    flexGrow: 1,
    width: '100%',
    hieght: '100%',
    margin: 0,
    padding: '0.1%',
  },
}));

function Home() {
  const classes = useStyles();
  document.title = 'Home';
  useHistory().push('/Home');

  return (
    <Grid container direction="row" spacing={3} className={classes.root}>
      <CssBaseline />
      <Grid item xs={1}>
        <SideBarSocialLinks />
      </Grid>
      <Grid item xs={11}>
        <SearchSection />
      </Grid>
      <Grid container direction="row" spacing={3} className={classes.JLB}>
        <JobListingBottom />
      </Grid>
    </Grid>
  );
}
export default Home;
