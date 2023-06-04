import './sign-in.styles.scss';
import { signInWithGoogleRedirect, signInWithGooglePopup, createDocumentFromAuth } from '../../utils/firebase.utils';

const SignIn = () => {
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