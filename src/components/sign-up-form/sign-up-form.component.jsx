import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        try {
            let { user } = await createAuthUserWithEmailAndPassword(email, password);
            //console.log(user);

            await createUserDocumentFromAuth(user, { displayName });

            setFormFields(defaultFormFields); // Reset form fields after successful signup
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Email already in use");
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
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Display Name"}
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

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


                <FormInput
                    label={"Confirm Password"}
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );

}

export default SignUpForm;