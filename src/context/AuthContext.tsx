import { createContext, useContext, useState, type ReactNode } from "react";
import {jwtDecode} from "jwt-decode";
import type { JwtPayload } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
    role: string | null;
    userId: number | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredAuth() {
    const token = localStorage.getItem("token");
    if (!token) return { token: null, role: null, userId: null };

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return { token, role: decoded.role, userId: decoded.id };
    } catch {
        return { token, role: localStorage.getItem("role"), userId: null };
    }
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: AuthProviderProps){ 
    const [initialAuth] = useState(getStoredAuth);
    const [token, setTokenState] = useState<string | null>(initialAuth.token);
    const [role, setRole] = useState<string | null>(initialAuth.role);
    const [userId, setUserId] = useState<number | null>(initialAuth.userId);

    const navigate = useNavigate();

    const setToken = (newToken: string | null) => {
        if (newToken === null) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setTokenState(null);
            setRole(null);
            setUserId(null);
            return;
        }

        localStorage.setItem("token", newToken);
        setTokenState(newToken);
        try {
        const decoded = jwtDecode<JwtPayload>(newToken);
        setRole(decoded.role);
        localStorage.setItem("role", decoded.role);
        setUserId(decoded.id);
        } catch (err) {
        console.error("Error decodificando token:", err);
        }
    };
    const logout = () => {
        setToken(null);
        navigate("/login");
    };
    return (
        <AuthContext.Provider value={{ token, setToken, role, userId, logout }}>
            {children}
        </AuthContext.Provider>
    );
}