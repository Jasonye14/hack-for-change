// Auth
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import db from '../utils/firebase';

const EmailLogin = async function (data, navigate, setPending, setIsLoggedIn, setCurrUser, setError) {
  const auth = getAuth();

  console.log(data);

  await setPersistence(auth, browserSessionPersistence);
  setPending(true);

  signInWithEmailAndPassword(auth, data['email'], data['password']).then((userCredential) => {
    // Signed in successfully
    const user = userCredential.user
    setIsLoggedIn(true);                                      // Set logged-in status
    setCurrUser(user);   // Set current user
    setError(false);
    setPending(false);

    // Get username from db; must exist at this point since auth succeeded
    setTimeout(() => {  
      const usersReference = ref(db, 'users');
      onValue(usersReference, snapshot => {
        const data = snapshot.val();
        const uid = user.uid;
        Object.keys(data).forEach(id => {
          if (id === uid) {
            navigate(`/users/${uid}`); // <-- use navigate instead of window.location.href
          }
        });
      });
    }, 100);
  }).catch(error => {
    setError(true);
    console.error(error.message);
  })
  setPending(false);
};

export default EmailLogin;
