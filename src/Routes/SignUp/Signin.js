import React, { useEffect, useState } from "react";
import {
    // getAuth,
    // createUserWithEmailAndPassword,
    getRedirectResult,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    // app,
    auth,
    signInwithGooglePopup,
    createUserDocumentFromAuth,
    // signInwithGoogleRedirect,
} from "../../Utils/Firebase/firebase";
import { Outlet } from "react-router-dom";
import FormInput from "./../../Components/FormInput/FormInput";
import Button from "./../../Components/Button/Button";
import "./../SignUp/signin.css";

// const auth = getAuth(app);
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

    // const createUser = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((value) => {
    //             alert("Success");
    //         })
    //         .catch((e) => {
    //             console.log(`Error: ${e}`);
    //         });
    // };

    const signInWithGoogle = async () => {
        try {
            const response = await signInwithGooglePopup();
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

    // const signInWithGoogleRed = async () => {
    //     try {
    //         const response = await signInwithGoogleRedirect();
    //         console.log(response.user);
    //     } catch (e) {
    //         console.log(`Error: ${e}`);
    //     }
    // };

    return (
        <div>
            <div className="signin-page">
                <div className="sign-in-container">
                    <h2>Already have an account?</h2>
                    <span>Sign in with your email and password</span>
                    {/* <label htmlFor="userMailsignin">Email</label> */}
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
                    {/* <label htmlFor="passwordSignin">Password</label> */}
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
                        {/* <button onClick={createUser}>Submit</button> */}
                        {/* <button onClick={signInWithGoogle}>Google Popup SignIn</button> */}
                        {/* <button onClick={signInwithGoogleRedirect}> */}
                        {/* Google Redirect SignIn */}
                        {/* </button> */}
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    );
}
