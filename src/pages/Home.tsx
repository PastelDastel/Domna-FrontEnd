import './Home.css'; // Import CSS for styling

const Home = () => {
    return (
        <div className="hero-section">
            <img 
                src="https://placehold.co/1800x800/242424/333" 
                alt="Placeholder" 
                className="hero-image" 
            />
            <div className="hero-overlay">
                <h1 className="hero-title">Riscopri la tua bellezza. Parte da te.</h1>
                <p className="hero-subtitle">
                    Inizia a prenderti cura del tuo corpo, ricevi subito tre video gratuiti
                </p>
                <button className="hero-button">Scopri di più</button>
            </div>
        </div>
    );
};

export default Home;
