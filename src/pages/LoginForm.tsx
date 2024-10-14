import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginForm() {
    const { email, setEmail, password, setPassword, setToken } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/login', {
                email,
                password
            });
            setToken(response.data.token);
            console.log('Login successful:', response.data);
            alert('Connexion réussie!');
            navigate('/film/1');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Erreur de connexion. Vérifiez votre email et votre mot de passe.');
        }
    };

    const handleRegisterClick = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
            <form className="form-container" onSubmit={handleLoginSubmit}>
                <div className="input-container">
                    <label className="label">
                        Adresse email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="input"
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label className="label">
                        Mot de passe:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="input"
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label className="label">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            onChange={handleChange}
                            className="checkbox"
                        />
                        Rester connecté
                    </label>
                </div>
                <div className="button-container">
                    <button type="submit" className="button">
                        Se connecter
                    </button>
                    <button type="button" className="button" onClick={handleRegisterClick}>
                        S'enregistrer
                    </button>
                </div>
            </form>
    );
}