
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseApp from '../../firebase'; // Import the Firebase app instance
import { LOG_OUT,LOGIN_FAIL,LOGIN_SUCCESS, LOGIN_REQUEST,LOAD_PROFILE } from '../actionType';
import { Provider } from 'react-redux';

export const login = () => async (dispatch) => {
    try {
        dispatch({
          type:LOGIN_REQUEST,
      })
    const auth = getAuth(firebaseApp); // Pass the Firebase app instance
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    const res = await signInWithPopup(auth, provider);
    console.log(res);
        console.log("inside action");
        const accessToken = res.user.accessToken
        const profile = {
            // name: res.additionalUserInfo.profile.displayName,
            // photoURL:res.additionalUserInfo.profile.photoURL,
            name: res.user.displayName,
             photoURL:res.user.photoURL,
        }
       
        console.log(profile)
        sessionStorage.setItem("ytc-access-token", accessToken)
        sessionStorage.setItem("ytc-user",JSON.stringify(profile))
        dispatch({
            type: LOGIN_SUCCESS,
            payload:accessToken
        })
        dispatch({
            type: LOAD_PROFILE,
            payload:profile
        })
  } catch (error) {
        console.error("Error during login:", error);
        dispatch({
            type: LOGIN_FAIL,
            payload:error.message,
        })
  }
};


export const log_out = () => async (dispatch) => {
    const auth = getAuth(firebaseApp); // Get the auth instance
    await auth.signOut();
    dispatch({
        type: LOG_OUT,
    });
    sessionStorage.removeItem("ytc-access-token");
    sessionStorage.removeItem("ytc-user");
};