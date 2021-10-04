import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import bgDark from '../assets/bg-dark.jpeg';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bgDark})`,
  },
  hello: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '96px',
    lineHeight: '112px',
    color: '#009AC7',
    textShadow: '0px 9px 35px #B7D7FF',
    userSelect: 'none',
  },
  button: {
    width: '333px',
    height: '70px',
    background: '#009AC7',
    boxShadow: '0px 9px 35px -7px rgba(0, 114, 255, 0.94)',
    borderRadius: '20px',
    color: '#FFF',
    fontSize: '24px',
    fontStyle: 'normal',
    textTransform: 'none',
    lineHeight: '29px',

    '&:hover': {
      background: 'rgba(0,154,199,0.56)',
    },
  },
}));

export default function Hello() {
  const classes = useStyles();
  const history = useHistory();

  const toLogin = () => {
    history.push('/Login');
  };

  return (
    <Container component="main" className={classes.main}>
      <CssBaseline />
      <div className={classes.page}>
        <Typography className={classes.hello} component="h1" variant="h5">
          Hello
        </Typography>
        <Button
          type="submit"
          className={classes.button}
          onClick={toLogin}
          disabled={false}
        >
          Log in
        </Button>
      </div>
    </Container>
  );
}
