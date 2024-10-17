import axios, { AxiosInstance } from 'axios';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    stayLoggedIn: boolean;
    email: string;
    password: string;
    api: AxiosInstance;
    setToken: (token: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setStayLoggedIn: (newValue: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const [token, setToken] = useState('');

    const isLoggedIn = true; // Call api to check token
    console.log(token);
    const api = axios.create({
        baseURL: "http://localhost:3500",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return (
        <AuthContext.Provider value={{ isLoggedIn, email, password, stayLoggedIn, api, setToken, setEmail, setPassword, setStayLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};