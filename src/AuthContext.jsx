import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);

    return (
        <AuthContext.Provider value={{user, setUser, session, setSession}}>
          {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

