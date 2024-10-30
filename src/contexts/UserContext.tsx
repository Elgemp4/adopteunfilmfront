import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
    login: () => Promise<void>;
    register: () => Promise<void>;
    changeSettings: () => Promise<void>;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthDate] = useState('')

    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const isLoggedIn = true; // Call api to check token

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user != null){
            fillData(JSON.parse(user))
        }
    }, [])

    

    const login = async () => {
        const response = await api.post('/login', {
            email,
            password
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));

        
        fillData(response.data.user);
        changeToken(response.data.token, stayLoggedIn);
    }

    const register = async () => {
        const response = await api.post('/register', {
            email,
            password,
            firstname,
            lastname,
            birthdate
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));

        fillData(response.data.user);

        changeToken(response.data.token, stayLoggedIn);
    }

    const changeSettings = async() => {
        const response = await api.post("/settings", {
            firstname,
            lastname,
            birthdate
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));

        fillData(response.data.user)
    }

    const fillData = (user : any) => {
        setEmail(user.email)
        setFirstname(user.firstName)
        setLastname(user.lastName)
        setBirthDate(user.birthDate.split("T")[0])
    }

    return (
        <UserContext.Provider value={{ isLoggedIn, email, password, firstname, lastname, birthDate: birthdate, stayLoggedIn,
                                     setEmail, setPassword, setFirstname, setLastname, setBirthDate, setStayLoggedIn, login, register, changeSettings }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};