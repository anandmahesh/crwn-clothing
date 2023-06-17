import { useState,useContext } from "react";

import FormInput from "../../components/form-input/form-input.component";
import Button from '../../components/button/button.component';
import { createDocumentFromAuth, signInWithGooglePopup, signInUserAuthEmailAndPassword } from "../../utils/firebase.utils";
import { UserContext } from "../../contexts/user.context";

import './sign-in-form.styles.scss';

const defaultFields = {
    email: '',
    password: '',
}

const SingInForm = () => {
    const [formFields, setFormFeilds] = useState(defaultFields);

    const {setCurrentUser} = useContext(UserContext);

    const { email, password } = formFields;

    const resetFields = () => {
        setFormFeilds(defaultFields);
    }

    const logInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createDocumentFromAuth(user);
        setCurrentUser(user);
        console.log(userDocRef);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInUserAuthEmailAndPassword(email, password);
            console.log("Sign In: ",user);
            setCurrentUser(user);
            resetFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Passwrod not correct');
                    break;
                case 'auth/user-not-found':
                    alert('user not created with email');
                    break;
                default:
                    console.log('sign-in', error);
                    break;
            }
        }
    }

    const handleChanges = (event) => {
        const { name, value } = event.target;
        setFormFeilds({ ...formFields, [name]: value });
    }

    //console.log(formFields);

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChanges} value={email} name="email" />
                <FormInput label="Password" type="password" required onChange={handleChanges} value={password} name="password" />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={logInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SingInForm;