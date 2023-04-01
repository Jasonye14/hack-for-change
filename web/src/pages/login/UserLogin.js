import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// component Imports
import GoogleButton from '../../components/Buttons/GoogleSignin';

// auth
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

// database
import db from '../../utils/firebase';
import { onValue, ref } from "firebase/database";
// import { log } from 'console';

// EXPORT
const UserLogin = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [code, setCode] = useState('');
const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
const [verificationType, setVerificationType] = useState('');

//here to handle used vars error for now
console.log(isTwoFactorEnabled);
console.log(verificationType);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
        // Signed in successfully
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });

    const auth = getAuth();
    await signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      
      const user = result.user;
      console.log(credential);

    // if user's email exists in users table, log them in

      const usersReference = ref(db, 'users');
      onValue(usersReference, snapshot => {
        const data = snapshot.val();
        if (data) { // ensure there is data in users path
          Object.entries(data).forEach(([k, v]) => {
            console.log(k, v.email);
            if (v.email === user.email) {
              document.cookie = `token=${token}`;
              window.location.href = `/users/${v.username}`;
            }
          });
        }
      });
      

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    // const email = error.customData.email;

    const credential = GoogleAuthProvider.credentialFromError(error);

    console.log({ errorCode, errorMessage, credential });
  });

}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()} 
      {'.'}
    </Typography>
  );
}

  const theme = createTheme();

  console.log(setEmail, setPassword, code, setCode, setIsTwoFactorEnabled, setVerificationType);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              className="btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <GoogleButton onClick={handleGoogleLogin}></GoogleButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default UserLogin;
