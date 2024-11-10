import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ items }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    if (openIndexes.includes(index)) {
      // Remove index from the array if it is already open
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      // Add index to the array if it is not open
      setOpenIndexes([...openIndexes, index]);
    }
  };



  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div className={styles.accordionItem} key={index}>
          <div
            className={styles.accordionHeader}
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.title}</span>
            <span className={styles.accordionToggle}>
              {openIndexes.includes(index) ? '-' : '+'}
            </span>
          </div>
          <div
            className={styles.accordionContent}
            style={{
              maxHeight: openIndexes.includes(index) ? '1000px' : '0',
            }}
          >
            <div style={{ padding: '0 15px' }}>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
