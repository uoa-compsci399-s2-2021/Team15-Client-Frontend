import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

import ALogo from '../assets/ALogo.png';
import bgDark from '../assets/bg-dark.jpeg';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0080A7',
      },
      '&:hover fieldset': {
        borderColor: '#0080A7',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0080A7',
      },
    },
    '& label.MuiFormLabel-root.Mui-focused': {
      color: '#000',
    },
    backgroundColor: '#0080A7',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100vw',
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '5px',
    border: '2px solid #80606A',
    backgroundColor: '#f2f2f2',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const isError = (condition) => hasErrors && condition;
  const history = useHistory();

  async function login(loginInfo) {
    return axios('https://cs399-team15.herokuapp.com/api/auth/login', {
      headers: {
        'Content-type': 'application/json',
      },
      data: loginInfo,
      method: 'POST',
    });
  }

  async function handleSignIn() {
    setHasErrors(true);
    const loginInfo = { email, password };
    if (
      email.length > 0
      && password.length > 0
      && email.endsWith('@aucklanduni.ac.nz')
    ) {
      try {
        setLoading(true);
        const response = await login(loginInfo);
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
          // window.location.href = '/';
          history.push('/');
        }
      } catch (e) {
        console.log(e);
        setErrorMessage(e.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        setLoading(false);
      }
    }
  }

  return (
    <Container component="main" className={classes.main} maxWidth={false}>
      <CssBaseline />
      <div className={classes.page}>
        <Container component="div" maxWidth="sm">
          <div className={classes.paper}>
            <Avatar className={classes.avatar} src={ALogo} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Typography color="error">{errorMessage}</Typography>
            <div className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                error={isError(email.length === 0)}
                helperText={
                  (isError(email.length === 0) && 'Please enter your email')
                  || isError(
                    !email.endsWith('@aucklanduni.ac.nz')
                    && 'Please use your UOA email',
                  )
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={isError(password.length === 0)}
                helperText={
                  isError(password.length === 0)
                  && 'Please enter your password!'
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                className={classes.submit}
                onClick={() => handleSignIn()}
                disabled={false}
                color="primary"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress color="inherit" size="2rem" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Container>
  );
}
