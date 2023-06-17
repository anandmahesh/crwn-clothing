import { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button from '../../components/button/button.component';
import { createDocumentFromAuth, createUserAuthEmailAndPassword } from "../../utils/firebase.utils";

import './sign-up-form.styles.scss';

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFeilds] = useState(defaultFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const resetFields = () => {
        setFormFeilds(defaultFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert('Password does not match');
            return;
        }

        try {
            const respose = await createUserAuthEmailAndPassword(email, password)
            const userDocRef = await createDocumentFromAuth(respose.user, { displayName });
            console.log(userDocRef);
            resetFields();
        } catch (error) {
            if (error.code = 'auth/email-already-in-use') {
                alert('Email already exist');
            } else {
                console.log('SingUp Error ', error);
            }
        }
    }

    const handleChanges = (event) => {
        const { name, value } = event.target;
        setFormFeilds({ ...formFields, [name]: value });
    }

    //console.log(formFields);

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChanges} value={displayName} name="displayName" />
                <FormInput label="Email" type="email" required onChange={handleChanges} value={email} name="email" />
                <FormInput label="Password" type="password" required onChange={handleChanges} value={password} name="password" />
                <FormInput label="Confirm Password" type="password" required onChange={handleChanges} value={confirmPassword} name="confirmPassword" />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;