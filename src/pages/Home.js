import {
    makeStyles, Grid,
} from '@material-ui/core';
import React from 'react';
import SideBar from "../components/Homepage/SideBar";
import SearchSection from "../components/Homepage/SearchSection";

const useStyles = makeStyles((theme) => ({
    colortext:
    {
        font: 'montserrat',
        color: '#009AC7',
    },
    loginButton:
    {
        font: 'montserrat',
        color: 'White',
        backgroundColor: '#009AC7',
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Home() {
    const classes = useStyles();
    return (
        <>

            {/* <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}>
                <Grid item>
                    <Typography variant="h4" className={classes.colortext}>
                    Welcome to UOA CS Job Board</Typography>
                </Grid>
                <Grid item>
                    <Button className={classes.loginButton} component={Link}
                    to={'/login'} variant="contained" color="primary">Login</Button>
                </Grid>
            </Grid> */}

            <Grid container spacing={3} className={classes.root}>
                <SideBar />
                <Grid item xs={11} direction="row">
                    <SearchSection />
                </Grid>

            </Grid>
        </>
    );
}

export default Home;
