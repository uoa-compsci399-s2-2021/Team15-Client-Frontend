import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    margin: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
}));
/** Holds the Search bar and the Text above it  */
export default function SearchSection() {
  const classes = useStyles();
  return (
    <Grid className={classes.container} container direction="column">
      <Grid item>
        <Typography variant={'h2'} style={{ fontFamily: 'Oswald' }}>
          They Only Want You
        </Typography>
      </Grid>
      <Grid item>
        <SearchBar />
      </Grid>
    </Grid>
  );
}
