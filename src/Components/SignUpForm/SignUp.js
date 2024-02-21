import React, { useContext, useState } from "react";
import {
    createUserEmailPwd,
    createUserDocumentFromAuth,
} from "./../../Utils/Firebase/firebase";
import FormInput from "./../FormInput/FormInput";
import "./../SignUpForm/signup.css";
import Button from "./../Button/Button";
// import { UserContext } from "../../Context/context";

const defaultState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export default function SignUpX() {
    const [formFields, setFormFields] = useState(defaultState);
    const { displayName, email, password, confirmPassword } = formFields;
    // const { setCurrentUser } = useContext(UserContext);

    const changeValue = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    const resetFormField = () => {
        setFormFields(defaultState);
    };

    const createUser = async (e) => {
        e.preventDefault();
        if (formFields.password !== formFields.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await createUserEmailPwd(formFields);
            if (response) {
                // setCurrentUser(response.user);
                console.log("User Created");
                const resp = await createUserDocumentFromAuth(
                    response.user,
                    formFields.displayName
                );
                if (resp) {
                    resetFormField();
                }
            } else {
                console.log("Error creating user");
            }
        } catch (e) {
            console.log(`Error creating user: ${e}`);
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={createUser}>
                <div>
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        id="userEmail"
                        placeholder="Email"
                        value={email}
                        onChange={changeValue}
                        required
                    />
                </div>

                <div>
                    <FormInput
                        label="Name"
                        type="text"
                        name="displayName"
                        id="userName"
                        placeholder="Name"
                        value={displayName}
                        onChange={changeValue}
                        required
                    />
                </div>

                <div>
                    <FormInput
                        label="Set Password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Set Password"
                        value={password}
                        onChange={changeValue}
                        required
                    />
                </div>

                <div>
                    <FormInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={changeValue}
                        required
                    />
                </div>

                <Button children="SIGN UP" type="submit" />
                {/* <button type="submit">SIGN UP</button> */}
            </form>
        </div>
    );
}
