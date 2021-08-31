import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader, Grid, Paper, Typography } from "@material-ui/core";
import Logo from "../logo";

export default function component(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100%",
      backgroundColor: props.color || "white",
    },

    header: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.root}>
      <Grid container direction="column">
        <Grid item xs={9} className={classes.Header}>
          {props.Name}
          <box component="span">
            <Logo />
          </box>
        </Grid>
        <Grid Item xs={3}>a</Grid>
      </Grid>
    </Paper>
  );
}
