import React, { useEffect, useState } from 'react';
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
import GoogleButton from '../../components/Buttons/GoogleSignInButton';

// Auth
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { getEUsername, useAuth } from '../../pages/login/AuthContext';

// Firebase
import { onValue, ref, set } from "firebase/database";
import db from '../../utils/firebase';

// Images
import ocean from '../../images/login/oceanBackground.jpg';

function UserLogin() {
  const navigate = useNavigate();  // <-- use this hook
  const [errorOpen, setError] = useState(false);
  const { isLoggedIn, setIsLoggedIn, currUser, setCurrUser, setPending } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      console.log(`${currUser.eUsername} logged in... (/login)`)
      navigate(`/users/${currUser.eUsername}`)
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence);
    const data = new FormData(event.target); // changed from event.target, which was null
    setPending(true);
    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user
        setIsLoggedIn(true);                                      // Set logged-in status
        setCurrUser({ ...user, eUsername: getEUsername(user)});   // Set current user
        setError(false);
        setPending(false);

        // Get username from db; must exist at this point since auth succeeded
        setTimeout(() => {  
          const usersReference = ref(db, 'users');
          onValue(usersReference, snapshot => {
            const data = snapshot.val();
            const uid = currUser.uid;
            Object.entries(data).forEach(([eUsername, data]) => {
              if (data.email === user.email) {
                navigate(`/users/${eUsername}`);                    // <-- use navigate instead of window.location.href
              }
            });
            // Object.entries(data).forEach(([id, data]) => {
            //   if (id === uid) {
            //     navigate(`/users/${uid}`);                    // <-- use navigate instead of window.location.href
            //   }
            // });
          });
        }, 400);
      })
      .catch(error => {
        setError(true);
        console.error(error.message);
      })
    setPending(false);
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence);

    setPending(true);
    signInWithPopup(auth, provider)
      .then(userCredential => {
        const user = userCredential.user;
        const email = user.email;
        const eUsername = getEUsername(user);                 // jak325@lehigh.edu => jak325lehigh
        let found = false;

        let usersReference = ref(db, 'users');
        onValue(usersReference, snapshot => {
          const data = snapshot.val();
          Object.entries(data).forEach(([eUsername, data]) => {
            if (data.email === user.email) {
              found = true;
              setIsLoggedIn(true);                            // Set logged-in status
              setCurrUser({ ...user, eUsername: eUsername});  // Set current user
              setError(false);
              setPending(false);

              navigate(`/users/${eUsername}`);                // <-- use navigate here too
            }
          });
  
          // User not found in db; create an instance for said user
          if (!found) {
            usersReference = ref(db, `users/${eUsername}`)
            set(usersReference, {
              email: email,
              fname: "",
              lname: "",
              location: "",
            });
          }
        });
      })
      .catch(error => {
        setError(true);
        console.log(error.message);
      })
    setPending(false);
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
