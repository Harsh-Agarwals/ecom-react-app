import { createContext, useEffect, useState } from "react";
import {
    authChange,
    userSignOut,
    createUserDocumentFromAuth,
} from "../Utils/Firebase/firebase";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    userSignOut();

    useEffect(() => {
        const unsubscribe = authChange((user) => {
            console.log(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
