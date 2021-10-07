import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import SearchResultsSection from '../SearchResults/SearchResultsSection';
const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
}));

export default function ListAllPage(props) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState({
    jobTitle: '',
    startingSalary: '',
    highestSalary: '',
    contract: [],
    location: [],
    beforeSearch: false,
    searchDone: false,
    listAll: true,
  });

  return (
    <Box>
      <SearchResultsSection
        id="SearchResults"
        className={classes.SearchResultSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userData={props.userData}
        handleUpdate={props.handleUpdate}
      />
    </Box>
  );
}
