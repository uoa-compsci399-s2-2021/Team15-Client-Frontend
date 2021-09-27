import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Toolbar, CssBaseline } from '@material-ui/core';
import { useHistory } from 'react-router';
import SideBarMenu from '../components/Homepage/SideBarMenu';
import CompanyLogo from '../components/CompanyLogo';
import Home from './Home';
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
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    height: '100vh',
    width: '100vw',
    scrollbarWidth: '100vw',
    overflowX: 'hidden',
  },
  AppBar: {
    background: 'None',
    color: 'black',
  },
  Tabs: {
    flexGrow: 1,
  },
  HomePage: {
    flexGrow: 1,
  },
}));

export default function HomePageRoute(props) {
  const classes = useStyles();
  const [value, setValue] = useState(props.tabValue);
  const location = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    location.push(newValue);
  };
  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <CssBaseline />
        <Toolbar>
          {/* <SideBarMenu /> */}
          <Tabs className={classes.Tabs} value={value} centered onChange={handleChange}>
            <Tab label="Home" value="/Home" style={{ fontFamily: 'Oswald' }} />
            <Tab label="Saved Jobs" value="/About" style={{ fontFamily: 'Oswald' }} />
          </Tabs>
          <CompanyLogo className={classes.Logo} companyName="Atech+" sx={{ height: 40 }} />
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={'/Home'} className={classes.HomePage}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={'/About'}>
        <About />
      </TabPanel>
    </Box>
  );
}
