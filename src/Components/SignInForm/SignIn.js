import React, { useEffect, useState, useContext } from "react";
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";

import {
    auth,
    signInwithGooglePopup,
    createUserDocumentFromAuth,
} from "./../../Utils/Firebase/firebase";

// import { Outlet } from "react-router-dom";
import FormInput from "./../FormInput/FormInput";
import Button from "./../Button/Button";
import SignUp from "./SignUp";

import "./../SignInForm/signin.css";
// import { UserContext } from "../../Context/context";

export default function Signin() {
    useEffect(() => {
        const res = async () => {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
            return response;
        };
        res();
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { setCurrentUser } = useContext(UserContext);

    const signInWithGoogle = async () => {
        try {
            const response = await signInwithGooglePopup();
            // setCurrentUser(response.user);
            console.log(response);
            const userDocRef = await createUserDocumentFromAuth(response.user);
            console.log(userDocRef);
            resetForm();
        } catch (e) {
            console.log(`Error -- ${e}`);
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const signInUser = async () => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(response);
            // setCurrentUser(response.user);
            if (response) {
                console.log("Logged In Successfully");
                resetForm();
            }
        } catch (e) {
            switch (e.code) {
                case "auth/invalid-credential":
                    alert("Invalid Credential, try again!");
                    break;
                case "auth/invalid-email":
                    alert("Invalid email");
                    break;
                case "auth/wrong-password":
                    alert("Wrong Password");
                    break;
                case "auth/user-not-found":
                    alert("User not registered, PLEASE SIGNUP!");
                    break;
                default:
                    console.log(`Error: ${e}`);
            }
        }
    };

    return (
        <div>
            <div className="signin-page">
                <div className="sign-in-container">
                    <h2>Already have an account?</h2>
                    <span>Sign in with your email and password</span>
                    <FormInput
                        label="Email"
                        type="email"
                        name="userMail"
                        id="userMailsignin"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        id="passwordSignin"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />

                    <div className="buttons">
                        <Button children="Sign In" onClick={signInUser} />
                        <Button
                            type="button"
                            children="Google SignIn"
                            buttonType="google"
                            onClick={signInWithGoogle}
                        />
                    </div>
                </div>

                <SignUp />
            </div>
        </div>
    );
}
