import React, { useEffect, useState } from "react";
import style from "./BlogsPanel.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const BlogsPanel = () => {
    const axiosPrivate = useAxiosPrivate();
    const [blogs, setBlogs] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get("/blogs");
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
            <h2>BLOOOOOOOOOOOOOOGS</h2>
            {blogs.map((item) => (
                <ItemCard
                    key={item._id}
                    item={item}
                    view={view}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
                    handleClick={handleClick} // Pass the function as a prop
                />
            ))}
        </div>
    );
};

export default BlogsPanel;