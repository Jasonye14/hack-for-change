import React from 'react';
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
import { onValue, ref, set } from "firebase/database";

//APP
import App from '../../App'
// EXPORT
const UserLogin = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    const data = new FormData(event.currentTarget);

    await signInWithEmailAndPassword(auth, data.get('email'), data.get('password')).then(userCredential => {
        // Signed in successfully
        const user = userCredential.user;
        console.log(userCredential);

        // get username from db; must exist at this point since auth succeeded
        const usersReference = ref(db, 'users');
        onValue(usersReference, snapshot => {
          const data = snapshot.val();
          Object.entries(data).forEach(([username, data]) => {
            if (data.email === user.email) {
              // document.cookie = `token=${token}`; // store token as cookie (necessary?)
              //Make Route in APP.js
              

              window.location.href = `/users/${username}`; // redirect to user's home page
            }
          });
        });
           
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    await signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      const email = user.email;
      const eUsername = email.replace(/\..+/g, '').replace('@', ''); // jak325@lehigh.edu => jak325lehigh
      let found = false;

      let usersReference = ref(db, 'users');
      onValue(usersReference, snapshot => {
        const data = snapshot.val();
        Object.entries(data).forEach(([username, data]) => {
          if (data.email === user.email) {
            found = true;
            //Make Route in APP.js
            

            window.location.href = `/users/${username}`; // redirect to user's home page
          }
        });

        // user not found in db; create an instance for said user
        if (!found) {
          usersReference = ref(db, `users/${eUsername}`)
          set(usersReference, {
            email: email,
            fname: "",
            lname: "",
            location: "",
          });
          //Make Route in APP.js
          
          console.log("in google veri");

          window.location.href = `/users/${eUsername}`; // redirect to user's home page
        }
      });

    }).catch((error) => {
      console.error(error.message);
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
            <GoogleButton onClick={handleGoogle}></GoogleButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
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
