import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Simulate a successful submission
        alert('Login successful!');
    };

    const handleRegisterSubmit = () => {
        navigate('/register');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="form-container" onSubmit={handleLoginSubmit}>
                <div className="input-container">
                    <label className="label">
                        Adresse email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
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
                            value={formData.password}
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
                            checked={formData.rememberMe}
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
                    <button type="submit" className="button" onClick={handleRegisterSubmit}>
                        S'enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}