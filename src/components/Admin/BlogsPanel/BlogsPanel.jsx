import React, { useEffect, useState } from "react";
import style from "./BlogsPanel.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import BlogCard from "./BlogCard/BlogCard";
import BlogModal from "./BlogModal/BlogModal";
const BlogsPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalState, setModalState] = useState({ isVisible: false, mode: "view" });

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get("/blog");
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            console.log("Finally");
        }
    };
    useEffect(() => {
        fetchData();
    }, [axiosPrivate]);
    const openModal = async (blog, mode) => {
        setSelectedBlog(blog);
        setModalState({ isVisible: true, mode });
        setLoading(true);
    };

    const closeModal = () => {
        setModalState({ isVisible: false, mode: "view" });
        setSelectedBlog(null);
    };

    const handleSave = async (updatedBlog) => {
        try {
            await axiosPrivate.put(`/api/blog/${updatedBlog._id}`, updatedBlog);
            setBlogs((prev) =>
                prev.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
            );
            closeModal();
        } catch (error) {
            console.error("Error saving article:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete(`/api/blog/${id}`);
            setBlogs((prev) => prev.filter((blog) => blog._id !== id));
            closeModal();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (!blogs.length) {
        return <div>Loading...</div>;
    }
    return (
        <div className={style.gridContainer}>
            <h2>Blog Articles</h2>
            {blogs.map((item) => (
                <BlogCard
                    key={item._id}
                    blog={item}
                    onView={() => openModal(item, "view")}
                    onEdit={() => openModal(item, "edit")}
                    onDelete={() => handleDelete(item._id)}
                />
            ))}
            {modalState.isVisible && (
                <BlogModal
                    blog={selectedBlog}
                    mode={modalState.mode}
                    loading={loading}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default BlogsPanel;