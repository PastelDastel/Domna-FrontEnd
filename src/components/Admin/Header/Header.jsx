import React, { useState } from 'react';
import style from './Header.module.css'; // Import the CSS module
import CourseModal from '../CoursesPanel/CourseModal/CourseModal';
import UserModal from '../UsersPanel/UserModal/UserModal';
import BlogModal from '../BlogsPanel/BlogModal/BlogModal';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
const Header = ({ view }) => {
    const axiosPrivate = useAxiosPrivate();
    const [showModal, setShowModal] = useState(false);
    const { auth } = useAuth();
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleSave = async (updatedItem) => {
        try {
            updatedItem.CreatedBy = auth.id;
            console.log("Updated Item:", updatedItem);
            await axiosPrivate.post(`/api/${view}`, updatedItem);
            setShowModal(false);
        } catch (error) {
            console.error(`Error saving ${view}:`, error);
        }
    };

    return (
        <>        <header className={style.header}>
            <h1 className={style.title}>
                {view === 'courses' ? 'Corsi Disponibili' : view === 'users' ? 'Utenti Registrati' : 'Articoli del Blog'}
            </h1>
            <button onClick={handleOpenModal} className={style.createBtn}>
                + Crea Nuovo
            </button>
        </header>

            {showModal && (<>
                {view === 'courses' ? <CourseModal
                    course={{}}
                    key={-1}
                    mode="edit"
                    loading={false}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                /> : view === 'users' ? <UserModal
                    user={{}}
                    relatedCourses={[]}
                    key={-1}
                    mode="edit"
                    loading={false}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}

                /> : <BlogModal
                    blog={{}}
                    key={-1}
                    mode="edit"
                    loading={false}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />}
            </>)}



        </>
    );
};

export default Header;
