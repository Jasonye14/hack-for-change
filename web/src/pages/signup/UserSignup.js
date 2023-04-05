import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

// database
import db from '../../utils/firebase';
import { onValue, ref, set } from "firebase/database";

//Import image background
import ocean from '../../images/login/oceanBackground.jpg';

const UserSignUp = () => {   
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

  const handleSubmit = async (event) => { // TODO: finish this
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const username = data.get('username') || email.replace(/\..+/g, '').replace('@', ''); // default username if none provided
    const fname = data.get('fname') ?? '';
    const lname = data.get('lname') ?? '';

    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      const usersReference = ref(db, `users/${username}`);
      console.log(user);

      console.log(user);
      set(usersReference, {
        email: user.email,
        fname: fname,
        lname: lname,
        location: "",
      });
      window.location.href = `/users/${username}`; // redirect to user's home page

    }).catch((error) => {
        console.error("ERROR: Email already taken.");
    });

  }
    
  return (
    <ThemeProvider theme={theme}>
      <img src={ocean} alt="" style={{position: "absolute", top:0, width: "100vw", height: "100vh", zIndex: -1, opacity: 0.8}}></img>
      <Container component="main" maxWidth="xs" sx={{backgroundColor: "white", opacity: 0.8, borderRadius: "20px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: "10px 0 15px 0",
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
                  name="username"
                  fullWidth
                  id="username"
                  label="Username (Email will be used if none provided)"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fname"
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lname"
                  fullWidth
                  id="lname"
                  label="Last Name"
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
                <Link href="/login" variant="body2" sx={{paddingBottom: "20px",}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserSignUp;