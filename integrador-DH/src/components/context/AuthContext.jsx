import { createContext, useState, useContext } from "react"



const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = (props) => {

    const [authToken,setAuthToken] = useState(null);
    const [isLoggIn, setIsLoggIn] = useState(false);

    const value = {authToken,setAuthToken, isLoggIn, setIsLoggIn}

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    
    )
}