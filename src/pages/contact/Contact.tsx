import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [message, setMessage] = useState('');
    const maxMessageLength = 300;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        //post to /public/contact
        console.log(data);
        
        const response = await fetch('https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io/public/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }

        const responseData = await response.json();
        console.log('Success:', responseData);


    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h2>HAI BISOGNO DI INFORMAZIONI?</h2>
            <h3>Contattaci!</h3>
            
            <div className="form-group">
                <label>Nome</label>
                <input type="text" name="name" required />
                
                <label>Cognome</label>
                <input type="text" name="surname" required />
            </div>

            <label>Email *</label>
            <input type="email" name="email" required />

            <label>Telefono</label>
            <input type="tel" name="phone" />

            <label>Messaggio *</label>
            <textarea 
                name="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                maxLength={maxMessageLength}
                required
            />
            <div className="character-count">{`${message.length} / ${maxMessageLength}`}</div>

            <div className="privacy-section">
                <input type="checkbox" id="privacyPolicy" required />
                <label htmlFor="privacyPolicy">
                    Si, sono d'accordo con l'informativa sulla <a href="/privacy">privacy policy</a> e <a href="/terms">termini e condizioni</a>.
                </label>
            </div>
            <button type="submit" className="submit-button">Invia</button>
        </form>
    );
};

export default Contact;
