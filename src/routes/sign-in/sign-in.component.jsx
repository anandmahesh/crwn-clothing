// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
//import {auth} from '../../utils/firebase.utils';

import './sign-in.styles.scss';
import { signInWithGoogleRedirect, signInWithGooglePopup, createDocumentFromAuth } from '../../utils/firebase.utils';

const SignIn = () => {
  

  //whenever the things mount Sign Redirect with Google
  // useEffect(() => {
  //   redirectWork();
  // }, []);

  // const redirectWork = async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const userDocRef = await createDocumentFromAuth(response.user);
  //     console.log(userDocRef);
  //   }
  // }

  // const logInWithRedirect = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user);
  // }

  const logInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createDocumentFromAuth(user);
    console.log(userDocRef);
  }

  return (
    <div>
      <h1>I am Sign In page</h1>
      <button onClick={logInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default SignIn;