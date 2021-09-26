import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HistoryIcon from '@material-ui/icons/History';
import DescriptionIcon from '@material-ui/icons/Description';
import { Typography } from '@material-ui/core';
import CompanyLogo from '../CompanyLogo';
const useStyles = makeStyles({
  list: {
    marginTop: '20%',
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [Open, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen({ ...Open, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CompanyLogo companyName="Atech+" sx={{ marginInline: 20 }} />
      <Typography component="span" variant="h4" style={{ fontFamily: 'montserrat' }}>
        Atech+
      </Typography>
      <List className={classes.list}>
        {['Home', 'Profile', 'History', 'Terms & Conditions'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {[<HomeIcon />, <AccountBoxIcon />, <HistoryIcon />, <DescriptionIcon />][index]}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <Button onClick={toggleDrawer('left', true)}>
          <MenuIcon />
        </Button>
        <Drawer open={Open.left} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
