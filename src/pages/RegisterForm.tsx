import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function RegisterForm() {
    const { email, password } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            email: email,
            password: password
        }));
    }, [email, password]);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/register', {
                email: formData.email,
                password: formData.password,
                firstname: formData.firstName,
                lastname: formData.lastName,
                birthdate: formData.birthDate
            });
            console.log('Form submitted:', response.data);
            alert('Inscription réussie!');
            navigate('/providers');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label className="label">
                        Prénom:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input"
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label className="label">
                        Nom:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="input"
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label className="label">
                        Date de naissance:
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="input"
                        />
                    </label>
                </div>
                <div className="button-container">
                    <button type="submit" className="button">
                        Suivant
                    </button>
                </div>
            </form>
        </div>
    );
}