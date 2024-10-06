import { useState } from 'react';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Simulate a successful submission
        alert('Form submitted successfully!');
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