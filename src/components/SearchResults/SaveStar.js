import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Checkbox } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

export default function SaveStar(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      position: 'relative',

      flexDirection: 'column',
      borderRadius: props.rounded ? 5 : 0,
      width: props.width ? props.width : 'auto',
      height: '100%',

      backgroundColor: props.color || 'orange',
      color: props.color === 'white' ? 'black' : 'white',

      textAlign: 'left',
    },
    gridContainer: {
      paddingLeft: 5,
      paddingTop: 10,
    },
    Header: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
      ...theme.typography.button,
      fontFamily: 'Oswald',
    },
    information: {
      marginRight: 31,
      fontSize: '0.75rem',
      paddingBottom: 10,
    },
    location: {
      paddingInlineStart: 10,
      fontWeight: 700,
    },
    ArrowForward: {
      position: 'absolute',
      right: 10,
      bottom: 5,
      marginTop: 10,
    },
    logo: {
      maxHeight: 40,
      float: 'right',
      marginRight: 10,
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
    img: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
  const classes = useStyles();
  const jobID = props.jobID;
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [saved, setSaved] = useState(
    props.userData.savedJobList.includes(jobID),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const closeMessageBox = () => {
    setOpenMessageBox(false);
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
        method: 'POST',
      },
    );
    return response;
  }
  async function handleSave() {
    const data = {
      jobId: props.jobID,
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
      console.log(e);
      console.log('error');
      setLoading(false);
      setError(true);
      props.openMessage();
      await timeout(2000);
      props.closeMessage();
    }
  }

  async function handleUnsave() {
    const data = {
      jobId: jobID,
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
    <div style={{ display: 'inline-block' }}>
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
    </div>
  );
}
