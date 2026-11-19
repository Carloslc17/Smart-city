import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as authApi from "../api/auth.api";
import { getErrorMessage } from "../utils/errors";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(sessionStorage.getItem("authToken")));
    const [initializationError, setInitializationError] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) return;

        authApi.meRequest()
            .then(setUser)
            .catch((error) => {
                if (error.response?.status === 401) {
                    sessionStorage.removeItem("authToken");
                } else {
                    setInitializationError(error);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const handleUnauthorized = () => {
            sessionStorage.removeItem("authToken");
            setUser(null);
        };
        window.addEventListener("auth:unauthorized", handleUnauthorized);
        return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
    }, []);

    const login = useCallback(async ({ email, password }) => {
        const { user: authenticatedUser, token } = await authApi.loginRequest({ email, password });
        sessionStorage.setItem("authToken", token);
        setUser(authenticatedUser);
    }, []);

    const register = useCallback(async ({ name, email, password }) => {
        const { user: authenticatedUser, token } = await authApi.registerRequest({
            username: name,
            email,
            password,
        });
        sessionStorage.setItem("authToken", token);
        setUser(authenticatedUser);
    }, []);

    const logout = useCallback(async () => {
        try {
            await authApi.logoutRequest();
        } finally {
            sessionStorage.removeItem("authToken");
            setUser(null);
        }
    }, []);

    const value = useMemo(() => ({
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        register,
        logout,
    }), [user, loading, login, register, logout]);

    if (loading) return <p style={{ padding: "2rem" }}>Cargando sesión…</p>;
    if (initializationError) {
        return <p role="alert" style={{ padding: "2rem" }}>{getErrorMessage(initializationError)}</p>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};