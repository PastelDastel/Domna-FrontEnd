import style from "./ContactParallax.module.css";

const ContactParallax = () => {
    return (<>
        <div className={style.parallax}>
            <div className={style.content}>
                <p className={style.text}>Hai Domande?</p>
                <a href="mailto:info@domna.net" className={style.contact}>Contatta Marcella</a>
            </div>
        </div>
    </>)
};


export default ContactParallax;