import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Homepage from '../../pages/Home';

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    AppBar:
    {
        background: 'None',
        color: 'black',
    },

}));

export default function NavBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.AppBar}>
                <Tabs className={classes.AppBar} value={value} centered onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="About" {...a11yProps(1)} />
                    <Tab label="Contact Us" {...a11yProps(2)} />
                    <Link to="/Login">
                        <Button variant="outlined" color="primary">Login</Button>
                    </Link>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Homepage />
            </TabPanel>
            <TabPanel value={value} index={1}>b</TabPanel>
            <TabPanel value={value} index={2}>c</TabPanel>
        </div>
    );
}
