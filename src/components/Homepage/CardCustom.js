import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, Grid, Paper, Typography, Box } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Logo from '../logo';

export default function CardCustom(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: '100%',
      backgroundColor: props.color || 'white',
      color: props.color === 'white' ? 'black' : 'white',
    },

    header: {
      flexGrow: 1,
    },
    logo: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
    ArrowForward: {
      position: 'absolute',
      right: 15,
      bottom: 0,
    },
    gridContainer: {
      paddingInlineStart: 5,
      paddingTop: 10,
    },
    information: {
      fontSize: '0.75rem',
    },
    location: {
      paddingInlineStart: 10,
    },
  }));

  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.root}>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.Header}>
          <Typography variant="p" style={{ fontSize: '1rem' }}>
            Lorem ipsum dolor sit amet, qu
          </Typography>
          <box component="span" className={classes.logo}>
            <Logo />
          </box>
        </Grid>
        <Grid Item className={classes.location}>
          <Typography variant="h6">80,000 $/Y</Typography>
          <LocationOnIcon />
          <span>Auckland</span>
        </Grid>
        <Grid>
          <Typography className={classes.information}>
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet.
          </Typography>
          <span className={classes.ArrowForward}>
            <ArrowForwardIcon />
          </span>
        </Grid>
      </Grid>
    </Paper>
  );
}
