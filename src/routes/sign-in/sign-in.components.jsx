import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase.utils";


const SignIn = () => {

    const logGoogleUser = async () => {
        let { user } = await signInWithGooglePopup();
        console.log(user);
        let userDocRef = createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button
                onClick={logGoogleUser}
            >Sign in with Google Popup</button>
        </div>
    );
}
export default SignIn;