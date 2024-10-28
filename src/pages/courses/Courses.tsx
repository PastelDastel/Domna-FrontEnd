import React from 'react';
import './Courses.css';
import { useNavigate } from 'react-router-dom';

interface Course {
    id: string;
    name: string;
    price: number;
    description: string;
}

const Courses: React.FC = () => {
    const navigate = useNavigate();

    // Funzione per navigare alla pagina di checkout con i dettagli del corso
    const goToCheckout = (course: Course) => {
        navigate('/checkout', { state: { course } });
    };

    // Dati dei corsi
    const courses: Course[] = [
        { id: 'D1', name: 'FORMULA MENSILE', price: 39, description: 'Include preparazione, pancia piatta, tonifica, anticellulite, X-LIVE, bonus video decorazioni' },
        { id: 'D2', name: 'FORMULA SEMESTRALE', price: 227, description: 'Include preparazione, pancia piatta, tonifica, anticellulite, X-LIVE, bonus video decorazioni' },
        { id: 'D3', name: 'FORMULA ANNUALE', price: 435, description: 'Include preparazione, pancia piatta, tonifica, anticellulite, X-LIVE, bonus video decorazioni' },
    ];

    return (
        <div className="courses">
            {/* Hero Section */}
            <section className="courses-hero">
                <h1>I Nostri Corsi</h1>
                <p>Scopri ora Domna e Domna + Live</p>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <h2>Allenati con Domna</h2>
                <div className="pricing-cards">
                    {courses.map(course => (
                        <div key={course.id} className="card">
                            <h3>{course.name}</h3>
                            <p className="price">{course.price}€</p>
                            <p>{course.description}</p>
                            <button onClick={() => goToCheckout(course)}>Acquista ora</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Courses;
