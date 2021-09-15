import { Box, Card, Grid, Typography } from '@material-ui/core';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CompanyLogo from '../components/CompanyLogo';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
}));

export default function About(props) {
  document.title = 'About';

  const classes = useStyles();
  return (
    <Card>
      <Grid container direction="column">
        <Grid container direction="row">
          <Grid item sx={{ flexGrow: 1, width: '50vw' }}>
            <Typography variant="h2">About Us</Typography>
            <Box>
              <CompanyLogo companyName="UniversityOfAuckland" />
            </Box>
          </Grid>
          <Grid item>b</Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>c</Grid>
          <Grid item>d</Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
