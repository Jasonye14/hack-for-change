import React, { useState } from 'react';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// component Imports
import GoogleButton from '../../components/Buttons/GoogleSignin';

// auth
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// database
import db from '../../utils/firebase';
import { onValue, ref } from "firebase/database";

// css style
import './UserLogin.css';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [verificationType, setVerificationType] = useState('');

  const handleLogin = () => {
    // handle login logic here
    if (isTwoFactorEnabled) {
      // send verification code via email or phone
      if (verificationType === 'email') {
        // send verification code via email
      } else if (verificationType === 'phone') {
        // send verification code via phone
      }
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });

    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      
      const user = result.user;
      console.log(credential);
      console.log(token);

      // if user's email exists in users table, log them in

      const usersReference = ref(db, 'users');
      onValue(usersReference, (snapshot) => {
        const data = snapshot.val();
        if (data) { // ensure there is data in users path
          Object.entries(data).forEach(([k, v]) => {
            console.log(k, v.email);
            if (v.email === user.email) {
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
  
      console.log({errorCode, errorMessage, credential});
    });

  }

  const handleVerifyCode = () => {
    // handle code verification logic here
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="background">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {/* <div className="form-group">
          <input type="checkbox" id="twoFactor" checked={isTwoFactorEnabled} onChange={(e) => setIsTwoFactorEnabled(e.target.checked)} />
          <label htmlFor="twoFactor">Enable Two-Factor Authentication</label>
        </div>

        {isTwoFactorEnabled && (
          <>
            <div className="form-group">
              <input type="radio" id="emailVerification" name="verificationType" value="email" checked={verificationType === 'email'} onChange={() => setVerificationType('email')} />
              <label htmlFor="emailVerification">Email Verification</label>
            </div>

            <div className="form-group">
              <input type="radio" id="phoneVerification" name="verificationType" value="phone" checked={verificationType === 'phone'} onChange={() => setVerificationType('phone')} />
              <label htmlFor="phoneVerification">Phone Verification</label>
            </div>

            <div className="form-group">
              <label htmlFor="verificationCode">Verification Code</label>
              <input type="text" id="verificationCode" value={code} onChange={(e) => setCode(e.target.value)} />
              <button className="btn" onClick={handleVerifyCode}>Verify</button>
            </div>
          </>
        )} */}

        <GoogleButton onClick={handleGoogleLogin}></GoogleButton>
        <button className="btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default UserLogin;
