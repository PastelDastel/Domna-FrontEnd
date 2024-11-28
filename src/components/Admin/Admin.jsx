import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import SearchBar from './Searchbar/SearchBar';
import style from './Admin.module.css'; // Import the CSS module
import UsersPanel from './UsersPanel/UsersPanel';
import BlogsPanel from './BlogsPanel/BlogsPanel';
import CoursesPanel from './CoursesPanel/CoursesPanel';
const AdminPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [view, setView] = useState('courses');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const endpoint = view === 'courses' ? '/api/courses' : view === 'users' ? '/api/users' : '/blog';
                const response = await axiosPrivate.get(endpoint);
                setData(response.data);
            } catch (err) {
                console.error(`Error fetching ${view}:`, err);
                setError(`Failed to load ${view}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view, axiosPrivate]);

    const handleNewItem = async (item) => {
        try {
            const endpoint = view === 'courses' ? '/api/courses' : view === 'users' ? '/api/users' : '/blog';
            const response = await axiosPrivate.post(endpoint, item);
            setData([...data, response.data]);
            setShowModal(false);
        } catch (err) {
            console.error(`Error creating new ${view}:`, err);
        }
    };
    return (
        <div className={style.adminPanel}>
            <Sidebar view={view} setView={setView} />
            <main className={style.mainContent}>
                <SearchBar></SearchBar>
                <Header view={view} handleAddNew={(newItem) => {
                    handleNewItem(newItem);
                    setSelectedItem(null);
                    setIsAdding(true);
                    setShowModal(true);
                }} />
                {
                    view === 'users' && <UsersPanel />
                }
                {
                    view === 'blog' && <BlogsPanel />
                }
                {view === 'courses' && <CoursesPanel />}

            </main>
        </div>
    );
};

export default AdminPanel;
