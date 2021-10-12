import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core';
import SearchBar from './SearchBar';

const useStyles = makeStyles((searchQuery, theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
  header: {
    fontFamily: 'Oswald',
    marginBottom: '60px',
    color: '#003866',
  },
}));
/** Holds the Search bar and the Text above it  */
export default function SearchSection({ searchQuery, onClickSearchResult }) {
  const classes = useStyles(searchQuery[0]);
  return (
    <Grid className={classes.container} container direction="column">
      <Grid item>
        {searchQuery[0].beforeSearch ? (
          <Typography variant={'h2'} className={classes.header} align="center">
            They Only Want You
          </Typography>
        ) : (
          <Box />
        )}
      </Grid>
      <Grid item>
        <SearchBar
          searchQuery={searchQuery}
          onClickSearchResult={onClickSearchResult}
        />
      </Grid>
    </Grid>
  );
}
