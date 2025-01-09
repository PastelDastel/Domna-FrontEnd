import React, { useEffect, useState } from "react";
import style from "./EditModal.module.css";
import Swal from "sweetalert2";

const EditModal = ({ closeModal, user, axios, onUserUpdated }) => {
    const [allCourses, setAllCourses] = useState([]); // All courses fetched from the backend
    const [isLoading, setIsLoading] = useState(true); // Loading state for courses
    const [updatedUser, setUpdatedUser] = useState({
        username: user.username,
        email: user.email,
        new_password: "", // Optional password field
        enrolledCourses: user.courses || [], // List of course IDs user is enrolled in
    });

    // Fetch all courses when the modal loads
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true); // Show loading spinner
            try {
                const response = await axios.get("/api/courses"); // Fetch all courses
                setAllCourses(response.data); // Update state with all courses
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                Swal.fire("Error", "Failed to fetch courses.", "error");
            } finally {
                setIsLoading(false); // Hide loading spinner
            }
        };
        fetchCourses();
    }, [axios]);

    // Toggle course enrollment
    const toggleCourse = (courseId) => {
        setUpdatedUser((prev) => {
            const isAlreadyEnrolled = prev.enrolledCourses.includes(courseId);
            const updatedCourses = isAlreadyEnrolled
                ? prev.enrolledCourses.filter((id) => id !== courseId) // Remove course
                : [...prev.enrolledCourses, courseId]; // Add course
            return { ...prev, enrolledCourses: updatedCourses };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            // Send updated user data
            const updatedData = { ...updatedUser };
            if (!updatedUser.new_password) delete updatedData.new_password; // Exclude empty password

            await axios.put(`/api/users/${user._id}`, updatedData);
            Swal.fire("Success", "User updated successfully!", "success");

            if (onUserUpdated) onUserUpdated(); // Reload users list
            closeModal(); // Close the modal
        } catch (err) {
            console.error("Failed to update user:", err);
            Swal.fire("Error", "Failed to update user.", "error");
        }
    };

    return (
        <div className={style.modalContainer}>
            <h1 className={style.title}>Edit User: {user.username}</h1>
            <div className={style.modalContent}>
                {/* Left Panel: User Details */}
                <div className={style.leftPanel}>
                    <label className={style.label}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={updatedUser.username}
                        onChange={handleChange}
                        className={style.input}
                    />

                    <label className={style.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                        className={style.input}
                    />

                    <label className={style.label}>Password:</label>
                    <input
                        type="password"
                        name="new_password"
                        placeholder="Enter new password"
                        value={updatedUser.new_password}
                        onChange={handleChange}
                        className={style.input}
                    />

                    <label className={style.label}>Role:</label>
                    <p className={style.readOnlyField}>{user.roles}</p>
                </div>

                {/* Right Panel: List of All Courses */}
                <div className={style.rightPanel}>
                    <h2 className={style.subTitle}>Manage Courses</h2>
                    {isLoading ? (
                        <div className={style.loadingScreen}>
                            <div className={style.spinner}></div>
                            <p>Loading courses...</p>
                        </div>
                    ) : (
                        <div className={style.coursesContainer}>
                            {allCourses.map((course) => (
                                <div key={course._id} className={style.courseItem}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={updatedUser.enrolledCourses.includes(course._id)}
                                            onChange={() => toggleCourse(course._id)}
                                        />
                                        {course.Title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className={style.buttonContainer}>
                <button onClick={handleSubmit} className={style.saveButton}>
                    Save Changes
                </button>
                <button onClick={closeModal} className={style.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default EditModal;
