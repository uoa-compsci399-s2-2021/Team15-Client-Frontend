import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Toolbar,
  CssBaseline,
  Grid,
  Typography,
  Button,
  Card,
  Checkbox,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import CardHeader from '@material-ui/core/CardHeader';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import IconButton from '@material-ui/core/IconButton';
import SideBarMenu from '../components/Homepage/SideBarMenu';
import CompanyLogo from '../components/CompanyLogo';
import Homepage from './Home';
import SavedJobs from './SavedJobs';
import SideBarSocialLinks from '../components/Homepage/SideBarSocialLinks';
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
  middleContainer: { flexGrow: 1 },
  closeButton: {
    marginTop: 10,
    // position: "absolute",
    // left: theme.spacing(8),
    // top: theme.spacing(9),
  },
  logo: {
    // position: "absolute",
    // right: theme.spacing(2),
    // top: -theme.spacing(17),
    maxWidth: 100,
    float: 'right',
  },
  card: {
    width: '95%',
    height: '100%',
    marginTop: 10,
    backgroundColor: '#f7f7f5',
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
  },
  body: {
    whiteSpace: 'pre-line',
    marginTop: 10,
  },
  save: {
    '& svg': {
      fontSize: 43,
    },
    color: '#f2d12c',
  },
}));

export default function JobDetail(props) {
  const classes = useStyles();
  const [value, setValue] = useState(props.tabValue);
  const [openApply, setOpenApply] = useState(false);
  const location = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    location.push(newValue);
  };

  const history = useHistory();
  const handleCloseBtn = () => {
    history.goBack();
  };
  const salaryType = 'Market rate';
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

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <CssBaseline />
        <Toolbar>
          {/* <SideBarMenu /> */}
          <Tabs
            className={classes.Tabs}
            value={value}
            centered
            onChange={handleChange}
          >
            <Tab label="Home" value="/Home" style={{ fontFamily: 'Oswald' }} />
            <Tab
              label="Saved Jobs"
              value="/SavedJobs"
              style={{ fontFamily: 'Oswald' }}
            />
          </Tabs>
          <CompanyLogo
            className={classes.Logo}
            companyName="Atech+"
            sx={{ height: 40 }}
          />
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={'/Home'} className={classes.HomePage}>
        <Homepage />
      </TabPanel>
      <TabPanel value={value} index={'/SavedJobs'}>
        <SavedJobs />
      </TabPanel>
      <Grid container className={classes.middleContainer}>
        <Grid item xs={1}>
          <SideBarSocialLinks />
        </Grid>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={12}>
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                edge="start"
                size="small"
                onClick={handleCloseBtn}
              >
                <ArrowBackIosIcon fontSize="small" />
                <Typography>Back</Typography>
              </IconButton>
            </Grid>
            <Card className={classes.card}>
              <Grid item xs={12}>
                <Typography
                  display="inline"
                  style={{ fontSize: 40, verticalAlign: 'bottom' }}
                >
                  Google - Techincal Support/Analyst
                </Typography>
                <Checkbox
                  className={classes.save}
                  color="warning"
                  icon={<StarBorderRoundedIcon />}
                  checkedIcon={<StarRoundedIcon />}
                />
                <img
                  className={classes.logo}
                  src="https://benti-energies.com/asset/images/clients/logo-default.svg"
                  alt="not found"
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Typography
                  variant="h6"
                  display="inline"
                  style={{ marginRight: 30, verticalAlign: 'bottom' }}
                >
                  <LocationOnIcon
                    color="primary"
                    style={{ verticalAlign: 'middle' }}
                  />{' '}
                  Auckland
                </Typography>
                <Typography
                  variant="h6"
                  display="inline"
                  style={{ marginRight: 30, verticalAlign: 'middle' }}
                >
                  <EventNoteIcon
                    color="primary"
                    style={{ verticalAlign: 'middle' }}
                  />{' '}
                  Part Time
                </Typography>
                <Typography variant="h6" display="inline" noWrap>
                  <AccountBalanceWalletIcon
                    color="primary"
                    style={{ verticalAlign: 'middle', marginRight: 8 }}
                  />
                  {salaryType === 'Market rate' ? (
                    <>&quot;Market rate&quot;</>
                  ) : (
                    <>$30 Hourly</>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10, marginLeft: 5 }}>
                <Typography
                  variant="h6"
                  display="inline"
                  style={{ marginRight: 10 }}
                >
                  Start Date:
                </Typography>
                <Typography display="inline">20-11-2021</Typography>
                <br />
                <Typography
                  variant="h6"
                  display="inline"
                  style={{ marginRight: 10 }}
                >
                  Application Closing Date:
                </Typography>
                <Typography display="inline">8-10-2021</Typography>
                <br />
                <Typography
                  variant="h6"
                  display="inline"
                  style={{ marginRight: 10 }}
                >
                  Contract:
                </Typography>
                <Typography display="inline">Permanent</Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10, marginLeft: 5 }}>
                <Typography variant="h6" style={{ marginTop: 30 }}>
                  About the Company
                </Typography>
                <Typography className={classes.body}>{text}</Typography>
                <br />
                <Typography variant="h6" style={{ marginTop: 30 }}>
                  About the Role
                </Typography>
                <Typography className={classes.body}>{text}</Typography>
                <br />
                <Typography variant="h6" style={{ marginTop: 30 }}>
                  Key Skills
                </Typography>
                <Typography className={classes.body}>{text}</Typography>
                <br />
                <Typography variant="h6" style={{ marginTop: 30 }}>
                  Contact Detail
                </Typography>
                <Typography className={classes.body}>{text}</Typography>
              </Grid>
              {openApply ? (
                <Grid container xs={12} style={{ marginTop: 30 }}>
                  <Card className={classes.applySection}>
                    <Typography variant="h6">Application Detail:</Typography>
                    <Typography className={classes.body}>
                      {application}
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
                  >
                    Apply
                  </Button>
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
