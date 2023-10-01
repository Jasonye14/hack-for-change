import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import db from '../utils/firebase';

const GoogleLogin = async (navigate) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    await signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        
        const email = user.email;
        const uid = user.uid;

        let found = false;

        let usersReference = ref(db, 'users');
        onValue(usersReference, snapshot => {
            const result = snapshot.val();
            Object.keys(result).forEach(id => {
                if (uid === id) {
                    // user is already in system
                    found = true;
                    navigate(`/users/${uid}`); // redirect to user's home page
                }
            });

            // user not found in db; create a new entry
            if (!found) {
                usersReference = ref(db, `users/${uid}`);
                set(usersReference, {
                    // basic fields
                    username: email.replace(/\..+/g, '').replace('@', ''), // jak325@lehigh.edu => jak325lehigh
                    email: email,
                    fname: "",
                    lname: "",
                    
                    // user profile
                    phoneNumber: '',
                    dateOfBirth: '',
                    address: '',
                    education: '',
                    occupation: '',
                    affiliatedOrganization: '',

                    // user settings
                    notifications: false,
                    privateProfile: false
                });
                navigate(`/users/${uid}`); // redirect to user's home page
            }
        }, { onlyOnce: true });

    }).catch((error) => {
        console.error(error.message);
    });

}

export default GoogleLogin;
