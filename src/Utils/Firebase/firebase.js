import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXVLqjA4hAziTddAxN-D6SPMIxbOcCXUw",
    authDomain: "ecom-app-ccca6.firebaseapp.com",
    projectId: "ecom-app-ccca6",
    storageBucket: "ecom-app-ccca6.appspot.com",
    messagingSenderId: "898639173087",
    appId: "1:898639173087:web:1116eb6e8120c9a066a06a",
    databaseURL: "https://ecom-app-ccca6-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const db = getFirestore(app);
export const auth = getAuth(app);

export const createUserDocumentFromAuth = async (userAuth, dName) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if (!userSnapshot.exists()) {
        const { email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName: dName,
                email,
                createdAt,
            });
            console.log("Doc set up");
        } catch (e) {
            console.log(`Error setting user: ${e}`);
        }
    }
    return userDocRef;
};

export const signInwithGoogleRedirect = async () => {
    try {
        const response = await signInWithRedirect(auth, provider);
        console.log(response);
        alert("Success signing in with GOOGLE!");
        return response;
    } catch (e) {
        console.log(`Error signing in -- ${e}`);
    }
};

export const signInwithGooglePopup = async () => {
    try {
        const response = await signInWithPopup(auth, provider);
        console.log(response);
        alert("Signed in with Google");
        return response;
    } catch (e) {
        console.log(`Error: ${e}`);
    }
};

export const createUserEmailPwd = async (props) => {
    try {
        const { email, password } = props;
        if (!email || !password) return; //don't return anything
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        if (e.code === "auth/email-already-in-use") {
            alert("Email Already in Use, please provide alternate email");
        } else {
            console.log(`Error: ${e}`);
        }
    }
};

export const userSignOut = async () => {
    try {
        const response = await signOut(auth);
        if (response) {
            console.log("SIGNED OUT");
        }
    } catch (e) {
        console.log(`Error signing out: ${e}`);
    }
};

export const authChange = (callback) => onAuthStateChanged(auth, callback);
