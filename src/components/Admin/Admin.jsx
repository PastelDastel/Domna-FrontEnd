import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const AdminPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [view, setView] = useState('courses'); // Toggle between 'courses', 'users', and 'blog'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
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

    const handleModify = (item) => {
        setSelectedItem(item);
        setShowModal(true);
        setIsAdding(false);
    };

    const handleAddNew = () => {
        setSelectedItem(null);
        setShowModal(true);
        setIsAdding(true);
    };

    const handleSaveChanges = async () => {
        try {
            const itemData = {
                ...selectedItem,
                CreatedBy: auth.id,
            };
            const endpoint = view === 'courses'
                ? `/api/courses/${isAdding ? '' : selectedItem._id}`
                : view === 'users'
                ? `/api/users/${isAdding ? '' : selectedItem._id}`
                : `/api/blogs/${isAdding ? '' : selectedItem._id}`;
            const method = isAdding ? 'post' : 'put';
            await axiosPrivate[method](endpoint, itemData);
            if (isAdding) {
                setData([...data, itemData]);
            } else {
                setData(data.map(item => (item._id === selectedItem._id ? itemData : item)));
            }
            setShowModal(false);
            alert(`${view === 'courses' ? 'Course' : view === 'users' ? 'User' : 'Blog'} ${isAdding ? 'added' : 'modified'} successfully!`);
        } catch (err) {
            console.error(`Error ${isAdding ? 'adding' : 'modifying'} ${view}:`, err);
            alert(`Failed to ${isAdding ? 'add' : 'modify'} ${view}`);
        }
    };

    return (
        <div className="flex h-screen bg-pink-100">
            {/* Sidebar */}
            <aside className="w-64 bg-pink-500 p-4 text-white flex flex-col">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <button
                    onClick={() => setView('courses')}
                    className={`p-2 mb-2 rounded ${view === 'courses' ? 'bg-pink-600' : 'hover:bg-pink-400'}`}
                >
                    Corsi
                </button>
                <button
                    onClick={() => setView('users')}
                    className={`p-2 mb-2 rounded ${view === 'users' ? 'bg-pink-600' : 'hover:bg-pink-400'}`}
                >
                    Utenti
                </button>
                <button
                    onClick={() => setView('blog')}
                    className={`p-2 rounded ${view === 'blog' ? 'bg-pink-600' : 'hover:bg-pink-400'}`}
                >
                    Blog
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{view === 'courses' ? 'Corsi Disponibili' : view === 'users' ? 'Utenti Registrati' : 'Articoli del Blog'}</h1>
                    <button
                        onClick={handleAddNew}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        + Add New
                    </button>
                </header>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : data.length > 0 ? (
                    <ul className="space-y-4">
                        {data.map((item) => (
                            <li key={item._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                                <div>
                                    {view === 'courses' && (
                                        <>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p>{item.description}</p>
                                            <p className="text-sm text-gray-600">Instructor: {item.instructor}</p>
                                            <p className="text-sm text-gray-600">Duration: {item.duration}</p>
                                            <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                        </>
                                    )}
                                    {view === 'users' && (
                                        <>
                                            <h3 className="text-lg font-semibold">{item.username}</h3>
                                            <p className="text-sm text-gray-600">Email: {item.email}</p>
                                            <p className="text-sm text-gray-600">Phone: {item.phone}</p>
                                            <p className="text-sm text-gray-600">Roles: {JSON.stringify(item.roles)}</p>
                                        </>
                                    )}
                                    {view === 'blog' && (
                                        <>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p>{item.content}</p>
                                            <p className="text-sm text-gray-600">Author: {item.author}</p>
                                        </>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleModify(item)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun {view === 'courses' ? 'corso' : view === 'users' ? 'utente' : 'articolo'} disponibile al momento.</p>
                )}

                {/* Modal for Modifying */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg w-1/2">
                            <h2 className="text-2xl font-bold mb-4">
                                {isAdding ? 'Add New' : 'Modify'} {view === 'courses' ? 'Course' : view === 'users' ? 'User' : 'Blog'}
                            </h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSaveChanges();
                                }}
                            >
                                {view === 'courses' && (
                                    <>
                                        <label className="block mb-2">
                                            Title:
                                            <input
                                                type="text"
                                                value={selectedItem?.title || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Description:
                                            <input
                                                type="text"
                                                value={selectedItem?.description || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Instructor:
                                            <input
                                                type="text"
                                                value={selectedItem?.instructor || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, instructor: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Duration:
                                            <input
                                                type="text"
                                                value={selectedItem?.duration || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, duration: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Price:
                                            <input
                                                type="number"
                                                value={selectedItem?.price || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                    </>
                                )}
                                {view === 'users' && (
                                    <>
                                        <label className="block mb-2">
                                            Username:
                                            <input
                                                type="text"
                                                value={selectedItem?.username || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, username: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Email:
                                            <input
                                                type="email"
                                                value={selectedItem?.email || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Phone:
                                            <input
                                                type="text"
                                                value={selectedItem?.phone || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, phone: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                    </>
                                )}
                                {view === 'blog' && (
                                    <>
                                        <label className="block mb-2">
                                            Title:
                                            <input
                                                type="text"
                                                value={selectedItem?.title || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Content:
                                            <textarea
                                                value={selectedItem?.content || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, content: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Author:
                                            <input
                                                type="text"
                                                value={selectedItem?.author || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, author: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded mb-4"
                                            />
                                        </label>
                                    </>
                                )}
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
