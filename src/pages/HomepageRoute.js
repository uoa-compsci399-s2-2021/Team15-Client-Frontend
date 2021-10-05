import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Toolbar,
  CssBaseline,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useHistory } from 'react-router';
import { useParams, Link as RouterLink } from 'react-router-dom';
import CompanyLogo from '../components/CompanyLogo';
import Home from './Home';
import SavedJobs from './SavedJobs';

import bgDark from '../assets/bg-dark.jpeg';

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
    backgroundImage: `url(${bgDark})`,
  },
  userMenu: {
    '& .MuiPaper-root': {
      color: '#FFF',
      backgroundColor: '#D7D7D73F',
    },
    '& .MuiTypography-colorTextSecondary': {
      color: '#FFFC',
    },
    '& .MuiListItemIcon-root': {
      color: '#FFF',
    },
  },
  AppBar: {
    background: 'none',
    borderBottom: '1px solid #FFFA',
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({});
  const location = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [updated, setUpdated] = useState(false);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    location.push(newValue);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    setAnchorEl(null);
    localStorage.removeItem('authToken');
  };
  const handleUpdate = () => {
    setUpdated(!updated);
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          'https://cs399-team15.herokuapp.com/api/private/get-user-info',
          config,
        )
        .then((res) => {
          setUserData(res.data.data);
          // console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, [updated]);

  useEffect(() => {
    fetch('https://cs399-team15.herokuapp.com/api/admin/get-job-info')
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          setIsLoaded(true);
          setItems(result.filter((e) => e.isActive));
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);
  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      getContentAnchorEl={null}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.userMenu}
    >
      <MenuItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={userData.firstname + ' ' + userData.lastname} />
          </ListItemAvatar>
          {userData.firstname ? (
            <ListItemText
              primary={(
                <Typography style={{ fontFamily: 'Oswald' }}>
                  {capitalizeFirstLetter(userData.firstname)
                    + ' '
                    + capitalizeFirstLetter(userData.lastname)}
                </Typography>
              )}
              secondary={(
                <Typography
                  style={{ fontFamily: 'Oswald' }}
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {userData.email}
                </Typography>
              )}
            />
          ) : null}
        </ListItem>
      </MenuItem>
      <Divider variant="middle" className={classes.MenuItemDivider} />
      <MenuItem onClick={handleSignOut} component={RouterLink} to="/login">
        <ListItemIcon>
          <ExitToAppTwoToneIcon fontSize="medium" />
        </ListItemIcon>
        <Typography style={{ fontFamily: 'Oswald' }}>Sign out</Typography>
      </MenuItem>
    </Menu>
  );
  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <CssBaseline />
        <Toolbar>
          {/* <SideBarMenu /> */}
          <CompanyLogo
            className={classes.logo}
            companyName="Atech+"
            sx={{ height: 40 }}
          />
          <Tabs
            className={classes.Tabs}
            value={value}
            centered
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <Tab label="Home" value="/Home" style={{ fontFamily: 'Oswald' }} />
            <Tab
              label="Saved Jobs"
              value="/SavedJobs"
              style={{ fontFamily: 'Oswald' }}
            />
          </Tabs>
          {userData.firstname ? (
            <Typography style={{ fontFamily: 'Oswald' }}>
              {capitalizeFirstLetter(userData.firstname)}
            </Typography>
          ) : null}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar
              alt={userData.firstname + ' ' + userData.lastname}
              className={classes.large}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}

      <TabPanel value={value} index={'/Home'} className={classes.HomePage}>
        <Home
          userData={userData}
          items={items}
          isLoaded={props.isLoaded}
          handleUpdate={handleUpdate}
        />
      </TabPanel>
      <TabPanel value={value} index={'/SavedJobs'}>
        <SavedJobs
          userData={userData}
          items={items}
          handleUpdate={handleUpdate}
        />
      </TabPanel>
    </Box>
  );
}
