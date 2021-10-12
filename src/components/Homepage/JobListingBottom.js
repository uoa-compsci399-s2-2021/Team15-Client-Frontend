import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Grid, Paper, Typography } from '@material-ui/core';
import DJLB from './DJLB';

const useStyles = makeStyles(() => ({
  root: {},
  LatestJobs: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

    backgroundColor: '#a78b95',

    fontFamily: 'Oswald',
    color: 'white',

    textAlign: 'center',
    justifyContent: 'center',
  },
}));

export default function JobListingBottom(props) {
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item xs={2} className={classes.LatestJobs}>
        <ImageList cols={1} gap={0}>
          <ImageListItem rows={2}>
            <Paper variant="outlined" square className={classes.LatestJobs}>
              <Typography variant="h3" style={{ fontFamily: 'Oswald' }}>
                The
                <br />
                Latest
                <br />
                Jobs
              </Typography>
            </Paper>
          </ImageListItem>
        </ImageList>
      </Grid>
      <Grid item xs={10}>
        <DJLB
          detailOpen={props.detailOpen}
          closeDetail={props.closeDetail}
          items={props.items}
          isLoaded={props.isLoaded}
          userData={props.userData}
          handleUpdate={props.handleUpdate}
        />
      </Grid>
    </Grid>
  );
}
