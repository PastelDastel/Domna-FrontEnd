import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import style from "./Courses.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Overview from "./Overview/OverviewModal";
import CreateModal from "./Create/CreateModal";
import EditModal from "./Edit/EditModal";

const Courses = () => {
    const MySwal = withReactContent(Swal);
    const [courses, setCourses] = useState([]); // List of courses
    const [reload, setReload] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(true); // General loading state
    const axiosPrivate = useAxiosPrivate();

    const deleteCourse = async (course) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            html: `Are you sure you want to delete <strong>${course.title}</strong>?<br><em>You won't be able to revert this!</em>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await axiosPrivate.delete(`/api/courses/${course._id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: `${course.title} has been deleted.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    willClose: () => reloadCourses(),
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete ${course.title}. Please try again.`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                });
                console.error("Delete error:", error);
            }
        }
    };

    const reloadCourses = () => {
        setReload((prev) => !prev);
    };

    const viewCourse = async (course) => {
        const controller = new AbortController();
        const signal = controller.signal;

        MySwal.fire({
            title: `<div class="${style.modalTitle}">Fetching Data</div>`,
            html: `
                <div class="${style.modalContent}">
                    <div class="${style.spinner}"></div>
                    <p class="${style.modalText}">Fetching user details...</p>
                    <button id="cancel-button" class="${style.cancelButton}">Cancel</button>
                </div>
            `,
            didOpen: () => {
                document
                    .getElementById("cancel-button")
                    .addEventListener("click", () => {
                        controller.abort();
                        Swal.close();
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
            showConfirmButton: false,
            allowEscapeKey: true,
            willClose: () => controller.abort(),
        });

        try {
            const response = await axiosPrivate.get(`/api/courses/${course._id}/users`, { signal });
            const users = response.data;

            MySwal.fire({
                width: "80vw",
                html: (

                    <Overview
                        closeModal={() => Swal.close()}
                        users={users}
                        course={course}
                    />
                ),
                showConfirmButton: false,
                allowOutsideClick: true,
            });
        } catch (err) {
            if (err.name === "CanceledError") {
                console.log("Fetch operation was cancelled");
            } else {
                console.error("Error fetching user courses:", err);
                Swal.fire("Error", "Failed to fetch user data", "error");
            }
        }
    };

    const editCourse = async (course) => {
        MySwal.fire({
            width: "50vw",
            html: (
                <EditModal
                    closeModal={() => Swal.close()}
                    course={course}
                    axios={axiosPrivate}
                    onCourseUpdated={reloadCourses}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    };

    const createCourse = () => {
        MySwal.fire({
            width: "80vw",
            html: (
                <CreateModal
                    onCourseCreated={reloadCourses}
                    closeModal={() => Swal.close()}
                    axios={axiosPrivate}
                />
            ),
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    };

    useEffect(() => {
        const fetchCourses = async () => {
            setGlobalLoading(true);
            try {
                const response = await axiosPrivate.get("/api/courses"); // Fetch courses
                setCourses(response.data);
            } catch (err) {
                console.error("Error fetching courses:", err);
            } finally {
                setGlobalLoading(false);
            }
        };
        fetchCourses();
    }, [axiosPrivate, reload]);

    return (
        <div className={style.courses}>
            {globalLoading ? (
                <div className={style.loadingScreen}>
                    <div className={style.spinner}></div>
                    <p>Loading courses...</p>
                </div>
            ) : (
                <>
                    <div className={style.header}>
                        <h1>Courses</h1>
                        <button onClick={createCourse} className={style.createButton}>
                            Create New Course
                        </button>
                    </div>
                    <div className={style.coursesList}>
                        {courses.map((course) => (
                            <div key={course._id} className={style.course}>
                                <div className={style.header}>{course.title}</div>
                                <div className={style.main}>
                                    <div>Id: {course._id}</div>
                                    <div>Title: {course.title}</div>
                                    <div>Instructor: {course.instructor}</div>
                                    <div>Duration: {course.duration}</div>
                                    <div>Price: {course.price}</div>
                                    <div>Discounted Price: {course.discountedPrice}</div>
                                    <div>Subscribers: {course.subscribers.length}</div>
                                </div>
                                <div className={style.footer}>
                                    <button
                                        onClick={() => viewCourse(course)}
                                        className={style.footerButton}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => editCourse(course)}
                                        className={style.footerButton}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCourse(course)}
                                        className={style.footerButton}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Courses;
