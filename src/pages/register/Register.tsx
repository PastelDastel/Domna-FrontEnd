import React, { useState } from 'react';
import './Register.css';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Registration logic here
        console.log('Registration form submitted:', formValues);
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Informazioni sul Conto</h2>

                <label htmlFor="username">Username *</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formValues.username}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="password">Password *</label>
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        required
                    />
                    <span onClick={handleShowPasswordToggle} className="show-password">
                        {showPassword ? 'Nascondi Password' : 'Mostra Password'}
                    </span>
                </div>

                <label htmlFor="confirmPassword">Conferma Password *</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="email">Indirizzo Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="confirmEmail">Conferma Email *</label>
                <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={formValues.confirmEmail}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className="register-button">Registrati</button>

                <div className="links">
                    <a href="/login">Hai già un conto? Accedi</a>
                </div>
            </form>
        </div>
    );
};

export default Register;
