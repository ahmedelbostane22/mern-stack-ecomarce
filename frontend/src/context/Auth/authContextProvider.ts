
import AuthContext from "./authContext";
import { createElement, useState } from "react";
import type { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [userName, setUserName] = useState<string | null>(() => {
        return localStorage.getItem("userName");
    });

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    const login = (userName: string, token: string) => {
        setUserName(userName);
        setToken(token);

        localStorage.setItem("userName", userName);
        localStorage.setItem("token", token);
    };
    const logout = () => {
        setUserName(null);
        setToken(null);
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
    }

    return createElement(
        AuthContext.Provider,
        {
            value: {
                userName,
                token,
                login,
                isAuthenticated: !!token,
                logout,
                },
            },
            children
        );
};
export default AuthProvider;

