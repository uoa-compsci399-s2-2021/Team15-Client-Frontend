import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { Grid, Paper } from "@material-ui/core";
import CardCustom from "./CardCustom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
  LatestJobs: {
    height: "100%",
    backgroundColor: "Chocolate",
  },
}));

export default function JobListingBottom() {
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item xs={2} classes={classes.LatestJobs}>
        <Paper variant="outlined" square className={classes.LatestJobs}>
          The Latest Jobs
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <ImageList cols={5} gap={0}>
          <ImageListItem rows={1} cols={2}>
            <CardCustom Name="Software Tester" color="orange" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="tomato" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="DarkSeaGreen" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="brown" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="DodgerBlue" />
          </ImageListItem>
          <ImageListItem rows={1} cols={2}>
            <CardCustom Name="Software Tester" color="Plum" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="lightGrey" />
          </ImageListItem>
          <ImageListItem rows={1} cols={1}>
            <CardCustom Name="Software Tester" color="LightSteelBlue" />s
          </ImageListItem>
        </ImageList>
      </Grid>
    </Grid>
  );
}
