import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

  async function login(loginInfo) {
    const response = await axios(
      'https://cs399-team15.herokuapp.com/api/auth/login',
      {
        headers: {
          'Content-type': 'application/json',
        },
        data: loginInfo,
        method: 'POST',
      },
    );
    return response;
  }

  async function handleSignIn() {
    setHasErrors(true);
    const loginInfo = { email, password };
    if (email.length > 0 && password.length > 0) {
      try {
        setLoading(true);
        const response = await login(loginInfo);
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
          window.location.href = '/';
        }
        // console.log(response.data);
      } catch (e) {
        console.log(e);
        // setErrorMessage(e.response.data.info);
        setTimeout(() => {
          setErrorMessage('');
        }, 8000);
        setLoading(false);
        // console.log(localStorage.getItem('authToken'));
        // console.log(e.response.data.error);
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
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
              isError(email.length === 0) && 'Please enter your email!'
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
              isError(password.length === 0) && 'Please enter your password!'
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignIn()}
            disabled={false}
          >
            {loading ? (
              <CircularProgress color="inherit" size="2rem" />
            ) : (
              <>Sign In</>
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
}
