import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CompanyLogo from "./CompanyLogo";
import JobListingDetail from "./JobListingDetail";
import useFetch from "../apis/useFetch";

export default function CardCustom(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      position: "relative",

      flexDirection: "column",
      borderRadius: props.rounded ? 5 : 0,
      width: props.width ? props.width : "auto",
      height: "100%",

      backgroundColor: props.color || "orange",
      color: props.color === "white" ? "black" : "white",

      textAlign: "left",
    },
    gridContainer: {
      paddingLeft: 5,
      paddingTop: 10,
    },
    Header: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
      ...theme.typography.button,
    },
    information: {
      marginRight: 31,
      fontSize: "0.75rem",
      paddingBottom: 10,
    },
    location: {
      paddingInlineStart: 10,
      fontWeight: 700,
    },
    ArrowForward: {
      position: "absolute",
      right: 10,
      bottom: 5,
      marginTop: 10,
    },
  }));
  /*
  Example Use Case  as seen in the DJLB class
   <CardCustom item={item} color={colors[index]} />
   An Item Needs the Following Attributes
   eg: {
   companyName: "Youtube",
   positionName: "Frontend developer",
   jobLocation: "Auckland",
   jobSalary: 30000,
   jobDescription: "In this role you will be working on a branch
                      of youtube repository to add new experimental Features"
   }
   */
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    if (props.closeDetail) {
      props.closeDetail();
    }
  };
  let logoUrl = "";
  if (props.item.companyLogoURL) {
    logoUrl = props.item.companyLogoURL;
  } else {
    const { error } = useFetch(
      `https://logo.clearbit.com/${props.item.companyName}.com`,
    );
    // console.log(error);
    if (error) {
      logoUrl = "https://benti-energies.com/asset/images/clients/logo-default.svg";
    } else {
      logoUrl = `https://logo.clearbit.com/${props.item.companyName}.com`;
    }
  }
  return (
    <>
      <Paper
        variant="outlined"
        square
        className={classes.root}
        onClick={() => {
          setOpen(true);
          if (props.detailOpen) {
            props.detailOpen();
          }
        }}
      >
        <Grid container direction="column" className={classes.gridContainer}>
          <Grid item className={classes.Header}>
            <Typography sx={{ fontSize: "1rem" }} className={classes.title}>
              {props.item.positionName}
            </Typography>

            <CompanyLogo
              companyName={props.item.companyName}
              url={logoUrl}
              sx={{ maxHeight: 40, marginRight: 10 }}
            />
          </Grid>

          <Grid item className={classes.location}>
            <Typography variant="h6">
              {" "}
              {`$${props.item.jobSalary} ${props.item.jobSalaryType}`}
            </Typography>

            <LocationOnIcon />
            <span>{props.item.jobLocation}</span>
          </Grid>
          <Typography className={classes.information}>
            {typeof props.item.jobDescription !== "undefined"
              ? props.item.jobDescription.length > 173
                ? `${props.item.jobDescription.substr(0, 170)}...`
                : props.item.jobDescription
              : "Sorry This is embrassing"}
          </Typography>
        </Grid>
        <ArrowForwardIcon className={classes.ArrowForward} />
      </Paper>
      {open ? (
        <JobListingDetail item={props.item} open={open} hClose={handleClose} />
      ) : (
        <></>
      )}
    </>
  );
}
