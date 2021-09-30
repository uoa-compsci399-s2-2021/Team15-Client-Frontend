import { makeStyles, Grid, CssBaseline, Box } from '@material-ui/core';
import { React, useRef, useState, useEffect } from 'react';
import SideBarSocialLinks from '../components/Homepage/SideBarSocialLinks';
import SearchSection from '../components/Homepage/SearchSection';
import JobListingBottom from '../components/Homepage/JobListingBottom';
import SearchResult from '../components/SearchResults/SearchResultsSection';
import JobListingDetail from '../components/JobListingDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    backgroundColor: '#f5fbfc',
  },
  SearchSection: {
    margin: 'auto',
  },
  middleContainer: { flexGrow: 1 },
  searchResults: {},
  JLB: {},
  SearchResultSection: {
    maxwidth: '80vw',
  },
}));

function Home(props) {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  const classes = useStyles();
  const [searchQuery, setsearchQuery] = useState({
    jobTitle: '',
    startingSalary: '',
    highestSalary: '',
    contract: [],
    location: [],
    beforeSearch: true,
    searchDone: false,
    listAll: false,
  });
  const [width, setWidth] = useState(window.innerWidth);
  const [detailOpened, setDetailOpened] = useState(false);
  const onClickSearchResult = () => {
    setsearchQuery({
      ...searchQuery,
      beforeSearch: false,
      searchDone: false,
      listAll: false,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth));
  });
  const openDetail = () => {
    setDetailOpened(true);
  };
  const closeDetail = () => {
    setDetailOpened(false);
  };
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.middleContainer}>
        {width >= 800 ? (
          <Grid item xs={1}>
            <SideBarSocialLinks />
          </Grid>
        ) : null}
        <Grid item xs={11} className={classes.SearchSection}>
          <SearchSection
            searchQuery={[searchQuery, setsearchQuery]}
            onClickSearchResult={onClickSearchResult}
          />
        </Grid>
      </Grid>
      {/* searchQuery.beforeSearch */}
      {searchQuery.beforeSearch && (width > 1000 || detailOpened) ? (
        <Grid container className={classes.JLB}>
          <JobListingBottom
            detailOpen={openDetail}
            closeDetail={closeDetail}
            items={props.items}
            userData={props.userData}
            isLoaded={props.isLoaded}
            handleUpdate={props.handleUpdate}
          />
        </Grid>
      ) : null}
      {searchQuery.beforeSearch ? (
        <Box />
      ) : (
        <SearchResult
          id="SearchResults"
          className={classes.SearchResultSection}
          searchQuery={searchQuery}
          setsearchQuery={setsearchQuery}
          items={props.items}
          userData={props.userData}
          handleUpdate={props.handleUpdate}
        />
      )}
      {/* <JobListingDetail /> */}
    </Box>
  );
}
export default Home;
