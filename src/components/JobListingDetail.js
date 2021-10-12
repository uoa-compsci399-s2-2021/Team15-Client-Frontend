import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Box,
  Grid,
  Typography,
  Modal,
  Button,
  Card,
  Checkbox,
} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardHeader from '@material-ui/core/CardHeader';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetch from '../apis/useFetch';
import SaveStar from './SearchResults/SaveStar';

// const style = {
//   position: "absolute",
//   top: "10%",
//   left: "50%",
//   transform: "translate(-50%, -10%)",
//   width: "80vw",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

JobListingDetail.defaultProps = {
  item: {
    companyName: '',
    positionName: '',
    jobLocation: '',
    jobSalary: '',
    jobSalaryType: '',
    jobDescription: '',
    companyLogoURL: '',
    companyDescription: '',
    applicationContactDetail: '',
    questionContactDetail: '',
  },
};

export default function JobListingDetail({
  open,
  hClose,
  item,
  userData,
  handleUpdate,
}) {
  const useStyles = makeStyles((theme) => ({
    Header: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      height: '100vh',
      width: '100vw',
    },
    AppBar: {
      background: 'None',
      color: 'black',
    },
    Tabs: {
      flexGrow: 1,
      fontFamily: 'Oswald',
    },
    Tab: {
      fontFamily: 'Oswald',
    },
    HomePage: {
      flexGrow: 1,
    },
    middleContainer: {
      flexGrow: 1,
    },
    closeButton: {
      marginTop: 10,
      // position: "absolute",
      // left: theme.spacing(8),
      // top: theme.spacing(9),
    },
    logo: {
      // position: "fixed",
      // right: theme.spacing(2),
      // top: -theme.spacing(17),
      maxWidth: 60,
      float: 'right',
    },
    card: {
      width: '95%',
      height: '100%',
      marginTop: 10,
      // backgroundColor: '#090512',
      padding: 20,
      marginBottom: 20,
    },
    button: {
      marginTop: 20,
      float: 'right',
      fontSize: 20,
      marginBottom: 10,
    },
    applySection: {
      padding: 20,
      width: '100%',
    },
    body: {
      whiteSpace: 'pre-line',
      marginTop: 10,
    },
    save: {
      '& svg': {
        fontSize: 32,
      },
      color: '#f2d12c',
      verticalAlign: 'bottom',
    },
    dialogPaper: {
      height: '100vh',
      position: 'fixed',
      marginTop: 10,
    },
    dialogWrapper: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 5,
      paddingBottom: 10,
      backgroundColor: '#555',
      color: '#FFF',
      border: '2px solid #80606A',
      opacity: 0.99,
    },
    img: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
  const classes = useStyles();
  const [openApply, setOpenApply] = useState(false);
  const location = useHistory();
  const jobID = item._id;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    location.push(newValue);
  };

  const text = 'This is some dummy text. This is some dummy text. This is some dummy text. This is some dummy text. This is some dummy text. This is some dummy text. This is some dummy text. This is some dummy text. This is some dummy text. This is some dummy text.';
  // const application = "https://www.auckland.ac.nz/en.html";
  const application = text;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  const handleApply = () => {
    if (isURL(application)) {
      openInNewTab(application);
    } else {
      setOpenApply(true);
    }
  };

  function isURL(str) {
    return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str);
  }

  let logoUrl = '';
  if (item.companyLogoURL) {
    logoUrl = item.companyLogoURL;
  } else {
    const { error } = useFetch(
      `https://logo.clearbit.com/${item.companyName}.com`,
    );
    // console.log(error);
    if (error) {
      logoUrl = 'https://benti-energies.com/asset/images/clients/logo-default.svg';
    } else {
      logoUrl = `https://logo.clearbit.com/${item.companyName}.com`;
    }
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [saved, setSaved] = useState(userData.savedJobList.includes(jobID));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const closeMessageBox = () => {
    setOpenMessageBox(false);
  };
  const openMessage = () => {
    setOpenMessageBox(true);
  };

  async function saveJob(info) {
    const response = await axios(
      'https://cs399-team15.herokuapp.com/api/private/user-save-job',
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        data: info,
        method: 'POST',
      },
    );
    return response;
  }
  async function unsaveJob(info) {
    const response = await axios(
      'https://cs399-team15.herokuapp.com/api/private/user-delete-job',
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        data: info,
        method: 'DELETE',
      },
    );
    return response;
  }
  async function handleSave() {
    const data = {
      jobId: item._id,
    };
    try {
      setLoading(true);
      // call api
      const response = await saveJob(data);
      if (response.status === 200) {
        setLoading(false);
        setSaved(true);
        handleUpdate();
      } else {
        setError(true);
        setLoading(false);
        //   setOpenMessageBox(true);
        //   await timeout(2000);
        //   setOpenMessageBox(false);
      }
    } catch (e) {
      console.log('error');
      setLoading(false);
      setError(true);
      setOpenMessageBox(true);
      await timeout(2000);
      setOpenMessageBox(false);
    }
  }

  async function handleUnsave() {
    const data = {
      jobId: item._id,
    };
    try {
      setLoading(true);
      // call api
      const response = await unsaveJob(data);
      if (response.status === 200) {
        setLoading(false);
        setSaved(false);
        handleUpdate();
      } else {
        setError(true);
        setLoading(false);
        //   setOpenMessageBox(true);
        //   await timeout(2000);
        //   setOpenMessageBox(false);
      }
    } catch (e) {
      console.log(e);
      console.log('unsave Error');
      setLoading(false);
      setError(true);
      setOpenMessageBox(true);
      await timeout(2000);
      setOpenMessageBox(false);
    }
  }
  const handleOnChange = (e) => {
    if (saved) {
      handleUnsave();
    } else {
      handleSave();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={hClose}
        maxWidth="md"
        className={classes.dialogPaper}
      >
        <Grid container className={classes.dialogWrapper}>
          <Grid item xs={12}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              edge="start"
              size="small"
              onClick={hClose}
            >
              <ArrowBackIosIcon fontSize="small" style={{ color: 'white' }} />
              <Typography style={{ fontFamily: 'Oswald', color: 'white' }}>
                Back
              </Typography>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography
              display="inline"
              style={{
                fontSize: 30,
                verticalAlign: 'top',
                fontFamily: 'Oswald',
              }}
            >
              {item.companyName} - {item.positionName}
            </Typography>
            {loading ? (
              <CircularProgress
                className={classes.save}
                color="inherit"
                size="1.5rem"
              />
            ) : (
              <Checkbox
                className={classes.save}
                color="warning"
                checked={saved}
                icon={<StarBorderRoundedIcon />}
                checkedIcon={<StarRoundedIcon />}
                onChange={(e) => handleOnChange(e)}
              />
            )}
            {/* <SaveStar openMessage={openMessage} closeMessage={closeMessageBox} jobID={jobID} userData={userData} /> */}
            <img className={classes.logo} src={logoUrl} alt="not found" />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Typography
              variant="h6"
              display="inline"
              style={{
                marginRight: 30,
                verticalAlign: 'bottom',
                fontFamily: 'Oswald',
              }}
            >
              <LocationOnIcon
                sx={{ color: 'white' }}
                style={{ verticalAlign: 'middle' }}
              />{' '}
              {item.jobLocation}
            </Typography>
            <Typography
              variant="h6"
              display="inline"
              style={{
                marginRight: 30,
                verticalAlign: 'middle',
                fontFamily: 'Oswald',
              }}
            >
              <EventNoteIcon
                sx={{ color: 'white' }}
                style={{ verticalAlign: 'middle' }}
              />{' '}
              {item.jobHours}
            </Typography>
            <Typography
              variant="h6"
              display="inline"
              noWrap
              style={{ verticalAlign: 'middle', fontFamily: 'Oswald' }}
            >
              <AccountBalanceWalletIcon
                sx={{ color: 'white' }}
                style={{ verticalAlign: 'middle', marginRight: 8 }}
              />
              {item.jobSalaryType === 'Market rate' ? (
                <>&quot;Market rate&quot;</>
              ) : (
                <>
                  ${item.jobSalary} {item.jobSalaryType}
                </>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10, marginLeft: 5 }}>
            <Typography
              variant="h6"
              display="inline"
              style={{ marginRight: 10, fontFamily: 'Oswald' }}
            >
              Start Date:
            </Typography>
            <Typography display="inline" style={{}}>
              {item.jobStartTime}
            </Typography>
            <br />
            <Typography
              variant="h6"
              display="inline"
              style={{ marginRight: 10, fontFamily: 'Oswald' }}
            >
              Application Closing Date:
            </Typography>
            <Typography display="inline" style={{}}>
              {item.jobClosingDate}
            </Typography>
            <br />
            <Typography
              variant="h6"
              display="inline"
              style={{ marginRight: 10, fontFamily: 'Oswald' }}
            >
              Contract:
            </Typography>
            <Typography display="inline" style={{}}>
              Permanent
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: 10, marginLeft: 5, fontFamily: 'Oswald' }}
          >
            <Typography
              variant="h6"
              style={{ marginTop: 30, fontFamily: 'Oswald' }}
            >
              About the Company
            </Typography>
            <Typography className={classes.body}>
              {item.companyDescription}
            </Typography>
            <br />
            <Typography
              variant="h6"
              style={{ marginTop: 30, fontFamily: 'Oswald' }}
            >
              About the Role
            </Typography>
            <Typography className={classes.body}>
              {item.jobDescription}
            </Typography>
            <br />
            <Typography
              variant="h6"
              style={{ marginTop: 30, fontFamily: 'Oswald' }}
            >
              Key Skills
            </Typography>
            <Typography className={classes.body}>{item.jobSkill}</Typography>
          </Grid>
          {openApply ? (
            <Grid
              container
              xs={12}
              style={{ marginTop: 30, fontFamily: 'Oswald' }}
            >
              <Card className={classes.applySection}>
                <Typography variant="h6" style={{ fontFamily: 'Oswald' }}>
                  Application Detail:
                </Typography>
                <Typography className={classes.body}>
                  {item.applicationContactDetail}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginTop: 30, fontFamily: 'Oswald' }}
                >
                  Contact Detail
                </Typography>
                <Typography className={classes.body}>
                  {item.questionContactDetail}
                </Typography>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} md={3} style={{ marginLeft: 'auto' }}>
              <Button
                fullWidth
                color="primary"
                className={classes.button}
                variant="contained"
                onClick={handleApply}
                style={{ fontFamily: 'Oswald' }}
              >
                Apply
              </Button>
            </Grid>
          )}
        </Grid>
      </Dialog>
      <Dialog
        // className={classes.messageBox}
        maxWidth="xs"
        open={openMessageBox}
        onClose={closeMessageBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {error ? (
          <DialogContent>
            <div className={classes.img}>
              <img
                src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/alert-circle-orange-512.png"
                alt="Error"
                style={{
                  maxWidth: 100,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            </div>
            <DialogContentText
              align="center"
              variant="h5"
              style={{ color: 'black', margin: 8, fontFamily: 'Oswald' }}
            >
              Oops! Something went wrong. Please try again.
            </DialogContentText>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
