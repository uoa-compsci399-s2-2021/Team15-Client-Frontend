import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import test from '../apis';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function StyledButton() {
  const classes = useStyles();

  const handleOnclick = async () => {
    const response = await test();

    console.log(response.data.info);
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleOnclick}>
        Primary
      </Button>
    </div>
  );
}

export default StyledButton;
