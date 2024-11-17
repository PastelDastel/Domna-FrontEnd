import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import style from './DetailsModal.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faList } from '@fortawesome/free-solid-svg-icons'; // Example icons

const DetailsModal = ({ item, view, setShowDetailsModal }) => {
    const axiosPrivate = useAxiosPrivate();
    const [relatedData, setRelatedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!item || !item._id) {
            setLoading(false);
            return;
        }

        const fetchRelatedData = async () => {
            try {
                if (view === 'users') {
                    const response = await axiosPrivate.get(`/api/users/${item._id}/courses`);
                    setRelatedData(response.data);
                } else if (view === 'courses') {
                    const response = await axiosPrivate.get(`/api/courses/${item._id}/users`);
                    setRelatedData(response.data);
                }
            } catch (err) {
                console.error('Error fetching related data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedData();
    }, [item, view, axiosPrivate]);

    if (!item) {
        return null; // Render nothing if item is not defined
    }

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>{view === 'users' ? 'User Information' : 'Course Information'}</h2>
                    <button onClick={() => setShowDetailsModal(false)} className={style.closeButton}>
                        &times;
                    </button>
                </header>
                <section className={style.content}>
                    {view === 'users' ? (
                        <>
                            <div className={style.infoRow}>
                                <FontAwesomeIcon icon={faUser} className={style.icon} />
                                <p className={style.label}>Username:</p>
                                <span className={style.value}>{item.username}</span>
                            </div>
                            <div className={style.infoRow}>
                                <FontAwesomeIcon icon={faEnvelope} className={style.icon} />
                                <p className={style.label}>Email:</p>
                                <span className={style.value}>{item.email}</span>
                            </div>
                            <div className={style.infoRow}>
                                <FontAwesomeIcon icon={faPhone} className={style.icon} />
                                <p className={style.label}>Phone:</p>
                                <span className={style.value}>{item.phone}</span>
                            </div>
                            <div className={style.infoRow}>
                                <FontAwesomeIcon icon={faList} className={style.icon} />
                                <p className={style.label}>Roles:</p>
                                <span className={style.value}>
                                    {Array.isArray(item.roles) ? item.roles.join(', ') : item.roles}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={style.infoRow}>
                                <FontAwesomeIcon icon={faUser} className={style.icon} />
                                <p className={style.label}>Title:</p>
                                <span className={style.value}>{item.title}</span>
                            </div>
                            <div className={style.infoRow}>
                                <p className={style.label}>Description:</p>
                                <span className={style.value}>{item.description}</span>
                            </div>
                            <div className={style.infoRow}>
                                <p className={style.label}>Instructor:</p>
                                <span className={style.value}>{item.instructor}</span>
                            </div>
                            <div className={style.infoRow}>
                                <p className={style.label}>Duration:</p>
                                <span className={style.value}>{item.duration}</span>
                            </div>
                            <div className={style.infoRow}>
                                <p className={style.label}>Price:</p>
                                <span className={style.value}>${item.price}</span>
                            </div>
                            <div className={style.infoRow}>
                                <p className={style.label}>Section:</p>
                                <span className={style.value}>{item.section}</span>
                            </div>
                        </>
                    )}
                </section>
                <section className={style.relatedSection}>
                    <h3 className={style.sectionTitle}>
                        Related {view === 'users' ? 'Courses' : 'Users'}
                    </h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : relatedData.length > 0 ? (
                        <ul className={style.list}>
                            {relatedData.map((relatedItem, index) => (
                                <li key={relatedItem._id}>
                                    {view === 'users' ? relatedItem.title : relatedItem.username}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={style.noData}>No related {view === 'users' ? 'courses' : 'users'} found.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default DetailsModal;
