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
import { Alert, AlertTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import GoogleButton from '../../components/Buttons/GoogleSignin';

// Auth
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { useAuth } from '../../pages/login/AuthContext';

// Firebase
import { onValue, ref, set } from "firebase/database";
import db from '../../utils/firebase';

// Images
import ocean from '../../images/login/oceanBackground.jpg';


function UserLogin() {
  const navigate = useNavigate();  // <-- use this hook
  const [errorOpen, setError] = useState(false);
  const { setIsLoggedIn, setCurrUser, setPending } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence);
    const data = new FormData(event.currentTarget);

    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        setIsLoggedIn(true);  // Set logged-in status
        setCurrUser(user);    // Set current user
        setError(false);
        setPending(false);

        // get username from db; must exist at this point since auth succeeded
        const usersReference = ref(db, 'users');
        onValue(usersReference, snapshot => {
          const data = snapshot.val();
          Object.entries(data).forEach(([username, data]) => {
            if (data.email === user.email) {
              document.cookie = 'loggedin=true';  // store auth state as cookie
              navigate(`/users/${username}`);     // <-- use navigate instead of window.location.href
            }
          });
        });
      })
      .catch(error => {
        setError(true);
        console.error(error.message);
      })
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();


      signInWithPopup(auth, provider)
      .then(userCredential => {
        const user = userCredential.user;
        const email = user.email;
        const eUsername = email.replace(/\..+/g, '').replace('@', ''); // jak325@lehigh.edu => jak325lehigh
        let found = false;

        let usersReference = ref(db, 'users');
        onValue(usersReference, snapshot => {
          const data = snapshot.val();
          Object.entries(data).forEach(([username, data]) => {
            if (data.email === user.email) {
              found = true;
              document.cookie = 'loggedin=true';  // store auth state as cookie
              navigate(`/users/${username}`);     // <-- use navigate here too
              setIsLoggedIn(true);                // Set logged-in status
              setCurrUser(user);                  // Set current user
              setError(false);
              setPending(false);
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
            document.cookie = 'loggedin=true'; // store auth state as cookie
          }
        });
      })
      .catch(error => {
        setError(true);
        console.log(error.message);
      })
  }

  const theme = createTheme();

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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorOpen &&
            <Alert severity="error">
              <AlertTitle>Login Invalid</AlertTitle>
              <strong>Username or Password does not exist</strong>
            </Alert>
          }
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
          </Box>
          <GoogleButton onClick={handleGoogle}></GoogleButton>
            <Grid container>
              <Grid item sx={{paddingBottom: "20px",}}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserLogin;
