import React from 'react';
import style from './Sidebar.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPen, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Sidebar = ({ view, setView }) => {
    return (
        <aside className={style.sidebar}>
            <h2 className={style.title}>Pannello di amministrazione</h2>
            <ul className={style.menu}>
                <li
                    className={`${style.menuItem} ${view === 'courses' ? style.active : ''}`}
                    onClick={() => setView('courses')}
                >
                    <FontAwesomeIcon icon={faBook} className={style.icon} /> Corsi
                </li>
                <li
                    className={`${style.menuItem} ${view === 'blog' ? style.active : ''}`}
                    onClick={() => setView('blog')}
                >
                    <FontAwesomeIcon icon={faPen} className={style.icon} /> Blog
                </li>
                <li
                    className={`${style.menuItem} ${view === 'users' ? style.active : ''}`}
                    onClick={() => setView('users')}
                >
                    <FontAwesomeIcon icon={faUser} className={style.icon} /> Utenti
                </li>
                <li
                    className={`${style.menuItem} ${view === 'calendar' ? style.active : ''}`}
                    onClick={() => setView('calendar')}
                >
                    <FontAwesomeIcon icon={faCalendar} className={style.icon} /> Calendario
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
