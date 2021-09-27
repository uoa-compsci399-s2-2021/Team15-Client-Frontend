import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Grid, Typography, Modal } from '@material-ui/core';
import CompanyLogo from './CompanyLogo';

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -10%)',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
JobListingDetail.defaultProps = {
  item: {
    companyName: '',
    positionName: '',
    jobLocation: '',
    jobSalary: '',
    jobSalaryType: '',
    jobDescription: '',
    companyLogoURL: '',
    companyDescription: '',
    applicationContactDetail: '',
    questionContactDetail: '',
  },
};

export default function JobListingDetail({ open, hClose, item }) {
  const useStyles = makeStyles((theme) => ({
    Header: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    closeModal: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Modal
        open={open}
        onClose={hClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            style={{ position: 'absolute', top: 10, right: 10, marginBottom: 10 }}
            onClick={hClose}
            className={classes.closeModal}
          />

          <Grid item className={classes.Header}>
            <Typography
              sx={{ fontSize: '1rem' }}
              variant="h4"
              component="h2"
              className={classes.title}
            >
              {item.positionName}
            </Typography>
            <Box>
              <CompanyLogo
                companyName={item.companyName}
                url={item.companyLogoURL}
                sx={{ maxHeight: 40, marginRight: 10 }}
              />
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                component="a"
                href={`mailto:${item.applicationContactDetail}`}
              >
                {`Apply at: ${item.applicationContactDetail}`}
              </Typography>
            </Box>
          </Grid>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {item.companyName}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {item.jobLocation}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`$${item.jobSalary} ${item.jobSalaryType}`}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`About ${item.companyName}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {item.companyDescription}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            About the role <br />
            {item.jobDescription}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
