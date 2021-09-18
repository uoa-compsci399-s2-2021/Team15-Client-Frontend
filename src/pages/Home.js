import { makeStyles, Grid, CssBaseline, Box } from '@material-ui/core';
import { React, useState } from 'react';
import SideBarSocialLinks from '../components/Homepage/SideBarSocialLinks';
import SearchSection from '../components/Homepage/SearchSection';
import JobListingBottom from '../components/Homepage/JobListingBottom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
  },

  middleContainer: { flexGrow: 1 },

  JLB: {},
}));

function Home() {
  const classes = useStyles();
  document.title = 'Home';

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.middleContainer}>
        <Grid item xs={1}>
          <SideBarSocialLinks />
        </Grid>
        <Grid item xs={11} className={classes.SearchSection}>
          <SearchSection />
        </Grid>
      </Grid>
      <Grid container className={classes.JLB}>
        <JobListingBottom />
      </Grid>
    </Box>
  );
}
export default Home;
