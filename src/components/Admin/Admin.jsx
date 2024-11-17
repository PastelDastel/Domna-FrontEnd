import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import DataList from './DataList/DataList';
import DetailsModal from './DetailsModal/DetailsModal';
import ModalForm from './ModalForm/ModalForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import SearchBar from './Searchbar/SearchBar';
import style from './Admin.module.css'; // Import the CSS module

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
                const endpoint = view === 'courses' ? '/api/courses' : view === 'users' ? '/api/users' : '/api/blogs';
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

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setShowDetailsModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const endpoint = view === 'courses'
                ? `/api/courses/${id}`
                : view === 'users'
                ? `/api/users/${id}`
                : `/api/blogs/${id}`;
            await axiosPrivate.delete(endpoint);
            setData(data.filter(item => item._id !== id));
            alert(`${view === 'courses' ? 'Course' : view === 'users' ? 'User' : 'Blog'} deleted successfully!`);
        } catch (err) {
            console.error(`Error deleting ${view}:`, err);
            alert(`Failed to delete ${view}`);
        }
    };

    return (
        <div className={style.adminPanel}>
            <Sidebar view={view} setView={setView} />
            <main className={style.mainContent}>
                <SearchBar></SearchBar>
                <Header view={view} handleAddNew={() => {
                    setSelectedItem(null);
                    setIsAdding(true);
                    setShowModal(true);
                }} />
                <DataList
                    view={view}
                    data={data}
                    loading={loading}
                    error={error}
                    handleModify={(item) => {
                        setSelectedItem(item);
                        setIsAdding(false);
                        setShowModal(true);
                    }}
                    handleDelete={handleDelete}
                    handleClick={handleCardClick}
                />
                {showDetailsModal && (
                    <DetailsModal
                        item={selectedItem}
                        view={view}
                        setShowDetailsModal={setShowDetailsModal}
                    />
                )}
                {showModal && (
                    <ModalForm
                        view={view}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        setShowModal={setShowModal}
                        isAdding={isAdding}
                        setData={setData}
                        data={data}
                        auth={auth}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
