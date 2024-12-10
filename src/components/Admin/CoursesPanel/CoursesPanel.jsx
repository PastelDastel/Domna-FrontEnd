import React, { useEffect, useState } from "react";
import style from "./CoursesPanel.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CourseCard from "./CourseCard/CourseCard";
import CourseModal from "./CourseModal/CourseModal";
import SweetAlert from "../../Test/SweetAlert"; 

const CoursesPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [subscribedUsers, setSubscribedUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [modalState, setModalState] = useState({ isVisible: false, mode: "view" });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosPrivate.get("/api/courses");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, [axiosPrivate]);

    const openModal = async (course, mode) => {
        setSelectedCourse(course);
        setModalState({ isVisible: true, mode });
        console.log("course", course);
        setLoading(true);

        try {
            const response = await axiosPrivate.get(`/api/courses/${course._id}/users`);
            setSubscribedUsers(response.data);
        } catch (error) {
            console.error("Error fetching related courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalState({ isVisible: false, mode: "view" });
        setSelectedCourse(null);
        setSubscribedUsers([]);
    };

    const handleSave = async (updatedCourse) => {
        try {
            await axiosPrivate.put(`/api/courses/${updatedCourse._id}`, updatedCourse);
            setCourses((prev) =>
                prev.map((course) => (course._id === updatedCourse._id ? updatedCourse : course))
            );
            closeModal();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete(`/api/courses/${id}`);
            setCourses((prev) => prev.filter((course) => course._id !== id));
            closeModal();
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    if (!courses.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.gridContainer}>
            {courses.map((course) => (
                <CourseCard
                    key={course._id}
                    course={course}
                    onView={() => openModal(course, "view")}
                    onEdit={() => openModal(course, "edit")}
                    onDelete={() => handleDelete(course._id)}
                />
            ))}
            {modalState.isVisible && (
                <SweetAlert isOpen={true} />
            )}
        </div>
    );
};

export default CoursesPanel;
