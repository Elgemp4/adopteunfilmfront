import { createContext, useContext, useState, ReactNode } from 'react';
import api, { changeToken } from './api';

interface AuthContextType {
    isLoggedIn: boolean;
    stayLoggedIn: boolean;
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setStayLoggedIn: (newValue: boolean) => void;
    tryLogin: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthDate, setBirthDate] = useState(new Date())

    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const isLoggedIn = true; // Call api to check token


    const tryLogin = async () => {
        try {
            const response = await api.post('/login', {
                email,
                password
            });
            
            changeToken(response.data.token, stayLoggedIn);

            return true
            
        } catch (error) {
            console.log
            console.log(error)
            return false;
        }
    }

    const tryRegister = async () => {

    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, email, password, stayLoggedIn, setEmail, setPassword, setStayLoggedIn, tryLogin }}>
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