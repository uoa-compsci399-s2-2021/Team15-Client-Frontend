import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, Grid, Paper, Typography, Box, Avatar } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CompanyLogo from '../CompanyLogo';

export default function CardCustom(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: '100%',
      backgroundColor: props.color || 'orange',
      color: props.color === 'white' ? 'black' : 'white',
    },

    Header: {
      flexGrow: 1,
      ...theme.typography.button,
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
      fontWeight: 700,
    },
  }));
  /*
  Example Use Case  as seen in the DJLB class
   <CardCustom item={item} color={colors[index]} />
   */
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.root}>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.Header}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>
            {props.item.positionName}
          </Typography>

          <CompanyLogo
            companyName={props.item.companyName}
            className={classes.Logo}
            sx={{ position: 'Absolute', right: 10, top: 10, maxWidth: 100, maxHeight: 40 }}
          />
        </Grid>
        <Grid item className={classes.location}>
          <Typography variant="h6">{props.item.jobSalary} $/Y</Typography>
          <LocationOnIcon />
          <span>{props.item.jobLocation}</span>
        </Grid>
        <Grid>
          <Typography className={classes.information}>
            {typeof props.item.jobDescription !== 'undefined'
              ? props.item.jobDescription.length > 173
                ? `${props.item.jobDescription.substr(0, 170)}...`
                : props.item.jobDescription
              : 'Sorry This is embrassing'}
          </Typography>
          <span className={classes.ArrowForward}>
            <ArrowForwardIcon />
          </span>
        </Grid>
      </Grid>
    </Paper>
  );
}
