import { createContext, useContext } from "react";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userName: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;