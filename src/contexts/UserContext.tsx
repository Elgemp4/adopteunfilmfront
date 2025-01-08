import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api, { changeToken, disconnect } from './api';

interface AuthContextType {
    isLoggedIn: boolean;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birthDate: string;
    isFullyRegistered: boolean;
    logout: () => Promise<void>;
    checkToken: () => Promise<void>;
    setIsFullyRegistered: (value: boolean) => void;
    setIsLoggedIn: (logged: boolean) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setFirstname: (firstname: string) => void;
    setLastname: (lastname: string) => void;
    setBirthDate: (birthDate: string) => void;
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
    const [isFullyRegistered, _setIsFullyRegistered] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        checkToken();
    }, [])

    async function checkToken() {
        try{
            await api.post("/token");

            const user = localStorage.getItem("user");
        if(user != null)
        {
            fillData(JSON.parse(user))
        }
        setIsLoggedIn(true)
        }
        catch(error){
            console.error("Token check failed:", error);
            setIsLoggedIn(false);
        }

    }

    const logout = async () => {
        setIsLoggedIn(false);
        await disconnect();
    }

    const login = async () => {
        const response = await api.post('/login', {
            email,
            password
        });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setIsLoggedIn(true);

        fillData(response.data.user);
        changeToken(response.data.token);
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
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setIsLoggedIn(true);

        fillData(response.data.user);

        changeToken(response.data.token);
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

    const setIsFullyRegistered = (value: boolean) => {
        _setIsFullyRegistered(value);

        const userString = localStorage.getItem("user");

        if(userString == undefined) return;

        const user = JSON.parse(userString);

        user.isFullyRegistered = true;

        localStorage.setItem("user", JSON.stringify(user));
    }

    const fillData = (user : any) => {
        setEmail(user.email)
        setFirstname(user.firstName)
        setLastname(user.lastName)
        setBirthDate(user.birthDate.split("T")[0])
        _setIsFullyRegistered(user.isFullyRegistered)
    }

    return (
        <UserContext.Provider value={{ isLoggedIn, email, password, firstname, lastname, birthDate: birthdate, isFullyRegistered,
                                       logout, checkToken, setIsLoggedIn, setEmail, setPassword, setFirstname, setLastname, setBirthDate,
                                       setIsFullyRegistered, login, register, changeSettings }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};