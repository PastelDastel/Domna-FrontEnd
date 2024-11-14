import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ModalForm = ({ view, selectedItem, setSelectedItem, setShowModal, isAdding, setData, data, auth }) => {
    const axiosPrivate = useAxiosPrivate();
    
    // Local state to manage form input
    const [formState, setFormState] = useState(selectedItem || {});
    const [benefitInput, setBenefitInput] = useState('');
    const [excludedBenefitInput, setExcludedBenefitInput] = useState('');

    useEffect(() => {
        setFormState(selectedItem || {}); // Set formState to the selectedItem when it changes
    }, [selectedItem]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleKeyDown = (e, type) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const value = e.target.value.trim();
            if (type === 'benefits') {
                setFormState((prev) => ({
                    ...prev,
                    benefits: [...(prev.benefits || []), value],
                }));
                setBenefitInput('');
            } else if (type === 'excluded_benefits') {
                setFormState((prev) => ({
                    ...prev,
                    excluded_benefits: [...(prev.excluded_benefits || []), value],
                }));
                setExcludedBenefitInput('');
            }
        }
    };

    const handleSaveChanges = async () => {
        try {
            const itemData = {
                ...formState,
                CreatedBy: auth.id,
            };
            if (isAdding) {
                const response = await axiosPrivate.post(`/api/${view}`, itemData);
                setData([...data, response.data]);
            } else {
                await axiosPrivate.put(`/api/${view}/${selectedItem._id}`, itemData);
                setData(data.map((item) => (item._id === selectedItem._id ? itemData : item)));
            }

            // Update selectedItem only after saving the changes
            setSelectedItem(itemData);
            setShowModal(false);
            alert(`${view === 'courses' ? 'Course' : view === 'users' ? 'User' : 'Blog'} ${isAdding ? 'added' : 'modified'} successfully!`);
        } catch (err) {
            console.error(`Error ${isAdding ? 'adding' : 'modifying'} ${view}:`, err);
            alert(`Failed to ${isAdding ? 'add' : 'modify'} ${view}`);
        }
    };

    return (
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
                                    name="title"
                                    value={formState.title || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={formState.description || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Instructor:
                                <input
                                    type="text"
                                    name="instructor"
                                    value={formState.instructor || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Duration:
                                <input
                                    type="text"
                                    name="duration"
                                    value={formState.duration || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={formState.price || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Section:
                                <input
                                    type="text"
                                    name="section"
                                    value={formState.section || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Benefits:
                                <input
                                    type="text"
                                    value={benefitInput}
                                    onChange={(e) => setBenefitInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 'benefits')}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                    placeholder="Type a benefit and press Enter"
                                />
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {formState.benefits && formState.benefits.map((benefit, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </label>
                            <label className="block mb-2">
                                Excluded Benefits:
                                <input
                                    type="text"
                                    value={excludedBenefitInput}
                                    onChange={(e) => setExcludedBenefitInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 'excluded_benefits')}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                    placeholder="Type an excluded benefit and press Enter"
                                />
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {formState.excluded_benefits && formState.excluded_benefits.map((benefit, index) => (
                                        <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded">
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </label>
                        </>
                    )}
                    {view === 'users' && (
                        <>
                            <label className="block mb-2">
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={formState.username || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formState.email || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formState.phone || ''}
                                    onChange={handleInputChange}
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
                                    name="title"
                                    value={formState.title || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Content:
                                <textarea
                                    name="content"
                                    value={formState.content || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                            <label className="block mb-2">
                                Author:
                                <input
                                    type="text"
                                    name="author"
                                    value={formState.author || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-4"
                                />
                            </label>
                        </>
                    )}
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
