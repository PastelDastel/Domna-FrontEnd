import React, { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css'; // Importing the CSS module

const Accordion = () => {
    const [openItems, setOpenItems] = useState({});
    const contentRefs = useRef({});

    const toggleAccordion = (id) => {
        setOpenItems((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        Object.keys(contentRefs.current).forEach((id) => {
            if (contentRefs.current[id]) {
                contentRefs.current[id].style.maxHeight = openItems[id] ? `${contentRefs.current[id].scrollHeight}px` : '0';
            }
        });
    }, [openItems]);

    return (
        <div className={styles.accordion}>
            <div className={styles.accordionItem}>
                <div className={styles.accordionHeader} onClick={() => toggleAccordion('credentials')}>
                    <span>Referenze</span>
                    <span className={styles.accordionToggle}>{openItems['credentials'] ? '-' : '+'}</span>
                </div>
                <div
                    ref={(el) => (contentRefs.current['credentials'] = el)}
                    className={styles.accordionContent}
                    id="credentials"
                >
                    <p>Trainer Certificata Woman Functional Training</p>
                    <p>Trainer Certificata Primitive Movement</p>
                    <p>Trainer Certificata In Human Movement Optimisation</p>
                    <p>Diplomata In Nutraceutical Consultant</p>
                </div>
            </div>

            <div className={styles.accordionItem}>
                <div className={styles.accordionHeader} onClick={() => toggleAccordion('experience')}>
                    <span>Esperienze</span>
                    <span className={styles.accordionToggle}>{openItems['experience'] ? '-' : '+'}</span>
                </div>
                <div
                    ref={(el) => (contentRefs.current['experience'] = el)}
                    className={styles.accordionContent}
                    id="experience"
                >
                    <p>Dettagli esperienza...</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
