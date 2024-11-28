import React, { useEffect, useState } from "react";
import style from "./UsersPanel.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import UserCard from "./UserCard/UserCard";
import UserModal from "./UserModal/UserModal";

const UsersPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalState, setModalState] = useState({ isVisible: false, mode: "view" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosPrivate.get("/api/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [axiosPrivate]);

    const openModal = async (user, mode) => {
        setSelectedUser(user);
        setModalState({ isVisible: true, mode });
        setLoading(true);

        try {
            const response = await axiosPrivate.get(`/api/users/${user._id}/courses`);
            setRelatedCourses(response.data);
        } catch (error) {
            console.error("Error fetching related courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalState({ isVisible: false, mode: "view" });
        setSelectedUser(null);
        setRelatedCourses([]);
    };

    const handleSave = async (updatedUser) => {
        try {
            await axiosPrivate.put(`/api/users/${updatedUser._id}`, updatedUser);
            setUsers((prev) =>
                prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
            );
            closeModal();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete(`/api/users/${id}`);
            setUsers((prev) => prev.filter((user) => user._id !== id));
            closeModal();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (!users.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.gridContainer}>
            {users.map((user) => (
                <UserCard
                    key={user._id}
                    user={user}
                    onView={() => openModal(user, "view")}
                    onEdit={() => openModal(user, "edit")}
                    onDelete={() => handleDelete(user._id)}
                />
            ))}
            {modalState.isVisible && (
                <UserModal
                    user={selectedUser}
                    mode={modalState.mode}
                    loading={loading}
                    relatedCourses={relatedCourses}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default UsersPanel;
