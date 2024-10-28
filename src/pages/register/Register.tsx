import React, { useState, useContext } from "react";
import "./Register.css";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user, logout, register } = useContext(UserContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return; // Stop the form submission
    }

    // Clear any previous error message
    setErrorMessage(null);

    console.log("Registration form submitted:", formValues);

    if (user) {
      logout();
    }
    try {
      await register(formValues);
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed: " + error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Informazioni sul Conto</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="surname">Surname *</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formValues.surname}
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

        <label htmlFor="password">Password *</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
          <span onClick={handleShowPasswordToggle} className="show-password">
            {showPassword ? "Nascondi Password" : "Mostra Password"}
          </span>
        </div>

        <label htmlFor="confirmPassword">Conferma Password *</label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
          required
        />

        <button type="submit" className="register-button">
          Registrati
        </button>

        <div className="links">
          <a href="/login">Hai già un conto? Accedi</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
