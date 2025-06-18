import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        let unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user);
        })

        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        setCurrentUser
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};