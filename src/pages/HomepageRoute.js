import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/Homepage/NavBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    logo:
    {
        height: 35,
        textAlign: 'center',
    },
}));

export default function HomepageRoute() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar />
        </div>
    );
}
