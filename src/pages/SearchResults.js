import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../components/Homepage/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
}));

export default function SearchResults(props) {
  const classes = useStyles();
  return (
    <>
      <SearchBar />
    </>
  );
}
