import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Toolbar, CssBaseline } from '@material-ui/core';
import SideBarMenu from '../components/Homepage/SideBarMenu';
import CompanyLogo from '../components/CompanyLogo';
import Homepage from './Home';
import About from './About';
import ContactUs from './ContactUs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    hieght: '100%',
    margin: 0,
    padding: 0,
  },
  AppBar: {
    background: 'None',
    color: 'black',
  },
  Tabs: {
    flexGrow: 1,
  },
}));

export default function HomePageRoute(props) {
  const classes = useStyles();
  const [value, setValue] = useState(props.tabValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <CssBaseline />
        <Toolbar>
          <SideBarMenu />
          <Tabs className={classes.Tabs} value={value} centered onChange={handleChange}>
            <Tab label="Home" style={{ fontFamily: 'Oswald' }} />
            <Tab label="About" style={{ fontFamily: 'Oswald' }} />
            <Tab label="Contact Us" style={{ fontFamily: 'Oswald' }} />
          </Tabs>
          <CompanyLogo className={classes.Logo} companyName="Atech+" sx={{ height: 40 }} />
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Homepage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ContactUs />
      </TabPanel>
    </Box>
  );
}
