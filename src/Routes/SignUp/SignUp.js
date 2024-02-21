import React from "react";
// import { app } from "../../Utils/Firebase/firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignUpX from "./../../Components/SignUpForm/SignUp";

// const auth = getAuth(app);
export default function SignUp() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const LoginUser = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((value) => {
    //             console.log("User logged-in");
    //         })
    //         .catch((e) => {
    //             console.log(`Error: ${e}`);
    //         });
    // };
    return (
        <div>
            {/* <div className="signin-page">
                <label htmlFor="userMail">Enter Your Email:</label>
                <input
                    type="email"
                    name="userMail"
                    id="userMail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Enter Your Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />
                <button onClick={LoginUser}>Submit</button>
            </div> */}
            <SignUpX />
        </div>
    );
}
