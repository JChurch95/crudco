import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { set } from "zod";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (session) {
      const accessToken = session.access_token;
      const userId = user.id
      sessionStorage.setItem("sb-access-token", accessToken);
      sessionStorage.setItem("sb-user", userId);
    }
  }, [session, user]);

  useEffect(() => {
    const existingSession = sessionStorage.getItem("sb-access-token");
    const existingUser = sessionStorage.getItem("sb-user");
    if (existingSession) {
        setSession(existingSession);
    }
    if (existingUser) {
        setUser(existingUser);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser, session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
