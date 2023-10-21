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
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import GoogleButton from '../../components/Buttons/GoogleSignInButton';
import GoogleLogin from '../../database/GoogleLogin';

// Auth
import { useAuth } from '../../pages/login/AuthContext';

// Images
import ocean from '../../images/login/oceanBackground.jpg';
import EmailLogin from '../../database/EmailLogin';

function UserLogin() {
  const navigate = useNavigate();  // <-- use this hook
  const [errorOpen, setError] = useState(false);
  const { isLoggedIn, setIsLoggedIn, currUser, setCurrUser, setPending } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      console.log(`${currUser.uid} logged in... (/login)`);
      navigate(`/users/${currUser.uid}`);
    }
  }, []);

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
          <Box
            component="form"
            sx={{ mt: 1 }}
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              EmailLogin(event.target, navigate, setPending, setIsLoggedIn, setCurrUser, setError)
            }}
          >
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

          <GoogleButton onClick={() => GoogleLogin(navigate)}></GoogleButton>

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
