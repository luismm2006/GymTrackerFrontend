import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {jwtDecode} from "jwt-decode";
import type { JwtPayload } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
    loading: boolean;
    role: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: AuthProviderProps){ 
    const [token, setTokenState] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if(savedToken){
            setTokenState(savedToken);
        }
        setLoading(false);
    }, []);

    const setToken = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setTokenState(newToken);
        try {
        const decoded = jwtDecode<JwtPayload>(newToken);
        setRole(decoded.role);
        localStorage.setItem("role", decoded.role);
        
        } catch (err) {
        console.error("Error decodificando token:", err);
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setTokenState(null);
        setRole(null);
        navigate("/home");
    };
    return (
        <AuthContext.Provider value={{ token, setToken, role, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}