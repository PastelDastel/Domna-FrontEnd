import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">
                    {view === 'users' ? 'User Information' : 'Course Information'}
                </h2>
                <div>
                    {view === 'users' ? (
                        <>
                            <p><strong>Username:</strong> {item.username}</p>
                            <p><strong>Email:</strong> {item.email}</p>
                            <p><strong>Phone:</strong> {item.phone}</p>
                            <p><strong>Roles:</strong> {Array.isArray(item.roles) ? item.roles.join(', ') : item.roles}</p>
                        </>
                    ) : (
                        <>
                            <p><strong>Title:</strong> {item.title}</p>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Instructor:</strong> {item.instructor}</p>
                            <p><strong>Duration:</strong> {item.duration}</p>
                            <p><strong>Price:</strong> ${item.price}</p>
                            <p><strong>Section:</strong> {item.section}</p>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Benefits:</h3>
                                {item.benefits && item.benefits.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {item.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No benefits listed.</p>
                                )}
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Excluded Benefits:</h3>
                                {item.excluded_benefits && item.excluded_benefits.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {item.excluded_benefits.map((excluded, index) => (
                                            <li key={index}>{excluded}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No excluded benefits listed.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Related {view === 'users' ? 'Courses' : 'Users'}</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : relatedData.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {relatedData.map((relatedItem) => (
                                <li key={relatedItem._id}>
                                    {view === 'users' ? relatedItem.title : relatedItem.username}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No related {view === 'users' ? 'courses' : 'users'} found.</p>
                    )}
                </div>
                <button
                    onClick={() => setShowDetailsModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailsModal;
