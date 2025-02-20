import React, {useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const  AuthContext = React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,initializeUser)
        return unsubscribe
    }, [])
    async function initializeUser(user) {
        if(user){
            setCurrentUser({...user});
            setUserLoggedIn(true)
        }else{
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLoading(false)
    }
    const value ={
        currentUser,
        userLoggedIn,
        Loading
    }
    return (
        <AuthContext.Provider value={value}>
            {!Loading && children}
          </AuthContext.Provider>  
    )
}