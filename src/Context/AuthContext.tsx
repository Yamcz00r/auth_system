import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextProps {
  children?: React.ReactNode;
}

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }: AuthContextProps) {

    const [user, setUser] = useState<User>();
    

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser!)
        })
    })


    const initialValues = {
        user,
    }

    return (
        <AuthContext.Provider value={initialValues} >
            {children}
        </AuthContext.Provider>
    )
}
