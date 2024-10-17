import { createContext, useContext, useState, ReactNode } from 'react';
import api, { changeToken } from './api';

interface AuthContextType {
    isLoggedIn: boolean;
    stayLoggedIn: boolean;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birthDate: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setFirstname: (firstname: string) => void;
    setLastname: (lastname: string) => void;
    setBirthDate: (birthDate: string) => void;
    setStayLoggedIn: (newValue: boolean) => void;
    tryLogin: () => Promise<boolean>;
    tryRegister: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthDate] = useState('')

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
        try {
            const response = await api.post('/register', {
                email,
                password,
                firstname,
                lastname,
                birthdate
            });

            changeToken(response.data.token, stayLoggedIn);
            
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, email, password, firstname, lastname, birthDate: birthdate, stayLoggedIn,
                                     setEmail, setPassword, setFirstname, setLastname, setBirthDate, setStayLoggedIn, tryLogin, tryRegister }}>
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