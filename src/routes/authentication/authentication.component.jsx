import './authentication.styles.scss';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import SignInForm from '../sign-in-form/sign-in-form.component';

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;

// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
//import {auth} from '../../utils/firebase.utils';

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