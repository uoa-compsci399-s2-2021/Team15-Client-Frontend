import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
// material
import { Avatar, makeStyles, Box } from '@material-ui/core';
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
export default function CompanyLogo({ url, companyName, sx }) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setimgSrc] = useState();

  if (companyName === 'Atech+') {
    return (
      <Box
        component="img"
        src={'/ALogo.png'}
        alt="Atech+ logo"
        className={classes.logo}
        sx={{ maxWidth: 100, maxHeight: 40, ...sx }}
      />
    );
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response1 = await fetch(
          `https://logo.clearbit.com/${companyName}.com`,
        )
          .then((result) => {
            if (result.ok) setimgSrc(result.url);
          })
          .catch((err) => {});

        if (url) {
          const response2 = await fetch(url)
            .then((result) => {
              if (result.ok) setimgSrc(result.url);
            })
            .catch((err) => {});
        }
      };
    } catch (err) {
      console.log(err);
    }
    fetchData();
  }, []);

  if (imgSrc) {
    return (
      <Box
        component="img"
        src={imgSrc}
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
