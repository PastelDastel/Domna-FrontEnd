import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import style from './ModalForm.module.css'; // Import the CSS module

const ModalForm = ({ view, selectedItem, setSelectedItem, setShowModal, isAdding, setData, data, auth }) => {
    const axiosPrivate = useAxiosPrivate();
    const [formState, setFormState] = useState(selectedItem || {});
    const [benefitInput, setBenefitInput] = useState('');
    const [excludedBenefitInput, setExcludedBenefitInput] = useState('');

    useEffect(() => {
        setFormState(selectedItem || {});
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

            setSelectedItem(itemData);
            setShowModal(false);
            alert(`${view === 'courses' ? 'Course' : view === 'users' ? 'User' : 'Blog'} ${isAdding ? 'added' : 'modified'} successfully!`);
        } catch (err) {
            console.error(`Error ${isAdding ? 'adding' : 'modifying'} ${view}:`, err);
            alert(`Failed to ${isAdding ? 'add' : 'modify'} ${view}`);
        }
    };

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <h2 className={style.header}>
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
                            <label className={style.label}>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={formState.title || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={formState.description || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Instructor:
                                <input
                                    type="text"
                                    name="instructor"
                                    value={formState.instructor || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Duration:
                                <input
                                    type="text"
                                    name="duration"
                                    value={formState.duration || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={formState.price || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Section:
                                <input
                                    type="text"
                                    name="section"
                                    value={formState.section || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Benefits:
                                <input
                                    type="text"
                                    value={benefitInput}
                                    onChange={(e) => setBenefitInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 'benefits')}
                                    className={style.input}
                                    placeholder="Type a benefit and press Enter"
                                />
                                <div className={style.flexContainer}>
                                    {formState.benefits && formState.benefits.map((benefit, index) => (
                                        <span key={index} className={style.benefit}>
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </label>
                            <label className={style.label}>
                                Excluded Benefits:
                                <input
                                    type="text"
                                    value={excludedBenefitInput}
                                    onChange={(e) => setExcludedBenefitInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 'excluded_benefits')}
                                    className={style.input}
                                    placeholder="Type an excluded benefit and press Enter"
                                />
                                <div className={style.flexContainer}>
                                    {formState.excluded_benefits && formState.excluded_benefits.map((benefit, index) => (
                                        <span key={index} className={style.excludedBenefit}>
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </label>
                        </>
                    )}
                    {view === 'users' && (
                        <>
                            <label className={style.label}>
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={formState.username || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formState.email || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formState.phone || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                        </>
                    )}
                    {view === 'blog' && (
                        <>
                            <label className={style.label}>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={formState.title || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                            <label className={style.label}>
                                Content:
                                <textarea
                                    name="content"
                                    value={formState.content || ''}
                                    onChange={handleInputChange}
                                    className={style.textarea}
                                />
                            </label>
                            <label className={style.label}>
                                Author:
                                <input
                                    type="text"
                                    name="author"
                                    value={formState.author || ''}
                                    onChange={handleInputChange}
                                    className={style.input}
                                />
                            </label>
                        </>
                    )}
                    <div className={style.buttonContainer}>
                        <button type="button" onClick={() => setShowModal(false)} className={style.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={style.saveButton}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
