import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {
    Link,
    Box,
    Grid,
    Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        margin: 'auto',
        justifyContent: "center",
        alignItems: "center",
    },

}));

export default function SideBar() {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            xs={1}
        >

            <Grid sm={3}><Tooltip title="UOA Compsci Twitter"><Link target="_blank" href="https://twitter.com/uoacompsci"><TwitterIcon /></Link></Tooltip></Grid>
            <Grid sm={3}><Tooltip title="UOA Instagram"><Link target="_blank" href="https://www.instagram.com/universityofauckland/"><InstagramIcon /></Link></Tooltip></Grid>
            <Grid sm={3}><Tooltip title="UOA CDES Facebook"><Link target="_blank" href="https://www.facebook.com/UniofAklCDES"><FacebookIcon /></Link></Tooltip></Grid>
            <Grid sm={3}>
                <Tooltip title="UOA CDES LinkedIn">
                    <Link target="_blank" href="https://www.linkedin.com/showcase/university-of-auckland-career-development-and-employability-services-cdes-/">
                        <LinkedInIcon />
                    </Link>
                </Tooltip>
            </Grid>
        </Grid>

    );
}
