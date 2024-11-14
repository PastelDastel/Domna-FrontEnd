import React from 'react';

const Sidebar = ({ view, setView }) => {
    return (
        <aside className="w-64 bg-pink-500 p-4 text-white flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <button onClick={() => setView('courses')} className={`p-2 mb-2 rounded ${view === 'courses' ? 'bg-pink-600' : 'hover:bg-pink-400'}`}>
                Corsi
            </button>
            <button onClick={() => setView('users')} className={`p-2 mb-2 rounded ${view === 'users' ? 'bg-pink-600' : 'hover:bg-pink-400'}`}>
                Utenti
            </button>
            <button onClick={() => setView('blog')} className={`p-2 rounded ${view === 'blog' ? 'bg-pink-600' : 'hover:bg-pink-400'}`}>
                Blog
            </button>
        </aside>
    );
};

export default Sidebar;
