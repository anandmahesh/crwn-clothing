import { useEffect } from "react";
import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from "../../utils/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {

    // useEffect(() => {
    //     async function fetchUser() {
    //         let response = await getRedirectResult(auth);
    //         console.log(response);
    //         if (response) {
    //             let userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     fetchUser();
    // }, []);

    const logGoogleUser = async () => {
        let { user } = await signInWithGooglePopup();
        console.log(user);
        let userDocRef = createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
        </div>
    );
}
export default SignIn;