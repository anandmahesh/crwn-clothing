import { useState } from "react";
import { createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";


const defaultFormFields = {
    email: '',
    password: ''
};


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //console.log(formFields);
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

    const logGoogleUser = async (event) => {
        event.preventDefault();
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let { user } = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user);

            setFormFields(defaultFormFields); // Reset form fields after successful signup
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                alert("Invalid credentials, please try again.");
            }
            console.log("error creating user", error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Email"}
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label={"Password"}
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={'google'} onClick={logGoogleUser}>Google Sign in</Button>
                </div>
            </form>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        </div>
    );

}

export default SignInForm;