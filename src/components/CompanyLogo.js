import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
// material
import { Avatar, makeStyles, Box } from '@material-ui/core';
import { width } from '@mui/system';
import ALogo from './ALogo.png';
// ----------------------------------------------------------------------
const useStyles = makeStyles(({ sx }) => ({
  logo: {},
  Avatar: {
    width: 'auto',
    minWidth: '40px',
    maxWidth: 135,
    paddingInline: 5,
  },
}));

CompanyLogo.propTypes = {
  companyName: PropTypes.string,
  sx: PropTypes.object,
};

/* Example useCase to make a logo
Seen on the card Custom class on the main Homepage
SX is the styling engine its basically CSS, classes.logo is local to the Card Custom
Functional component
  <CompanyLogo
            companyName={props.item.companyName}
            className={classes.Logo}
            sx={{ position: 'Absolute', right: 10, top: 10 }}
          />
 */
export default function CompanyLogo({ companyName, sx }) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState([]);
  const [error, setError] = useState(null);

  const fetchImg = () => {
    if (companyName !== '') {
      fetch(`https://logo.clearbit.com/${companyName}.com`)
        .then((res) => res)
        .then(
          (result) => {
            setImgSrc(result);
            setError(null);
          },
          (error) => {
            setError(error);
          },
        );
    }
  };

  if (companyName === 'Atech+') {
    return (
      <Box
        component="img"
        src={ALogo}
        alt="Atech+ logo"
        className={classes.logo}
        sx={{ maxWidth: 100, maxHeight: 40, ...sx }}
      />
    );
  }

  useEffect(() => {
    fetchImg();
  }, [companyName]);

  if (imgSrc.status === 200) {
    return (
      <Box
        component="img"
        src={imgSrc.url}
        alt={`${companyName} Logo`}
        className={classes.logo}
        sx={{ ...sx }}
      />
    );
  }
  return (
    <Box sx={{ ...sx }}>
      <Avatar variant="square" className={classes.Avatar}>
        {companyName || 'No'}
      </Avatar>
    </Box>
  );
}
