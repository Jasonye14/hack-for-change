import * as React from 'react';
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
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// database
import db from '../../utils/firebase';
import { onValue, ref, set } from "firebase/database";

const UserSignUp = () => {
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
          window.location.href = `/users/${eUsername}`; // redirect to user's home page
        }
      });

    }).catch((error) => {
      console.error(error.message);
    });

  }

      const handleSubmit = (event) => { // TODO: finish this
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    
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
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      fullWidth
                      id="username"
                      label="Username (Email will be used if none provided)"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <GoogleButton onClick={handleGoogle}></GoogleButton>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      );
};

export default UserSignUp;