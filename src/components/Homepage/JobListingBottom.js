import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import CardCustom from './CardCustom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
  },
  LatestJobs: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

    backgroundColor: '#7e5f6a',

    fontFamily: 'Oswald',
    color: 'white',

    textAlign: 'center',
    justifyContent: 'center',
  },
}));

export default function JobListingBottom() {
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item xs={2} classes={classes.LatestJobs}>
        <ImageList cols={1} gap={0}>
          <ImageListItem rows={2}>
            <Paper variant="outlined" square className={classes.LatestJobs}>
              <Typography variant="h3">
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
        <ImageList cols={5} gap={0}>
          <ImageListItem rows={1} cols={2}>
            <CardCustom Name="Software Tester" color="#f39400" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="#b14550" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="#9cb279" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="#9b5873" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="#647fb5" />
          </ImageListItem>
          <ImageListItem rows={1} cols={2}>
            <CardCustom Name="Software Tester" color="#98719d" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="#6c6671" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="#89adca" />s
          </ImageListItem>
        </ImageList>
      </Grid>
    </Grid>
  );
}
