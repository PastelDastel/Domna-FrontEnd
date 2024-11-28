import React, { useEffect, useState } from "react";
import style from "./BlogsPanel.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import BlogCard from "./BlogCard/BlogCard";
const BlogsPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const [blogs, setBlogs] = useState([]);
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
        </div>
    );
};

export default BlogsPanel;