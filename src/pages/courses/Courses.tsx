import './Courses.css';

const Courses = () => {
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
                    <div className="card">
                        <h3>FORMULA MENSILE</h3>
                        <p className="price">39€</p>
                        <p>Include:</p>
                        <ul>
                            <li>Preparazione</li>
                            <li>Pancia piatta</li>
                            <li>Tonifica</li>
                            <li>Anticellulite</li>
                            <li>X-LIVE</li>
                            <li>Bonus video decorazioni</li>
                        </ul>
                        <button>Acquista ora</button>
                    </div>
                    <div className="card">
                        <h3>FORMULA SEMESTRALE</h3>
                        <p className="old-price">235€</p>
                        <p className="price">227€</p>
                        <p>Include:</p>
                        <ul>
                            <li>Preparazione</li>
                            <li>Pancia piatta</li>
                            <li>Tonifica</li>
                            <li>Anticellulite</li>
                            <li>X-LIVE</li>
                            <li>Bonus video decorazioni</li>
                        </ul>
                        <button>Acquista ora</button>
                    </div>
                    <div className="card">
                        <h3>FORMULA ANNUALE</h3>
                        <p className="old-price">470€</p>
                        <p className="price">435€</p>
                        <p>Include:</p>
                        <ul>
                            <li>Preparazione</li>
                            <li>Pancia piatta</li>
                            <li>Tonifica</li>
                            <li>Anticellulite</li>
                            <li>X-LIVE</li>
                            <li>Bonus video decorazioni</li>
                        </ul>
                        <button>Acquista ora</button>
                    </div>
                </div>
            </section>

            {/* Info Boxes */}
            <section className="info-boxes">
                <div className="info-box">
                    <h3>Preparazione</h3>
                    <p>Il percorso nasce per acquisire qualità essenziali come FORZA e RESISTENZA...</p>
                </div>
                <div className="info-box">
                    <h3>Pancia piatta</h3>
                    <p>Programmazione focalizzata sull’eliminazione del grasso...</p>
                </div>
                <div className="info-box">
                    <h3>Tonifica</h3>
                    <p>Allenamento focalizzato su tonificazione e sviluppo muscolare...</p>
                </div>
            </section>

            {/* Secondary Pricing Section */}
            <section className="pricing-section">
                <h2>Allenati con Domna + Live</h2>
                <div className="pricing-cards">
                    <div className="card">
                        <h3>FORMULA MENSILE</h3>
                        <p className="price">59€</p>
                        <p>Include:</p>
                        <ul>
                            <li>Preparazione</li>
                            <li>Pancia piatta</li>
                            <li>Tonifica</li>
                            <li>Anticellulite</li>
                            <li>X-LIVE</li>
                            <li>Bonus video decorazioni</li>
                        </ul>
                        <button>Acquista ora</button>
                    </div>
                    <div className="card">
                        <h3>FORMULA SEMESTRALE</h3>
                        <p className="old-price">355€</p>
                        <p className="price">343€</p>
                        <p>Include:</p>
                        <ul>
                            <li>Preparazione</li>
                            <li>Pancia piatta</li>
                            <li>Tonifica</li>
                            <li>Anticellulite</li>
                            <li>X-LIVE</li>
                            <li>Bonus video decorazioni</li>
                        </ul>
                        <button>Acquista ora</button>
                    </div>
                    <div className="card">
                        <h3>FORMULA ANNUALE</h3>
                        <p className="old-price">708€</p>
                        <p className="price">658€</p>
                        <p>Include:</p>
                        <ul>
                            <li>Preparazione</li>
                            <li>Pancia piatta</li>
                            <li>Tonifica</li>
                            <li>Anticellulite</li>
                            <li>X-LIVE</li>
                            <li>Bonus video decorazioni</li>
                        </ul>
                        <button>Acquista ora</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Courses;
