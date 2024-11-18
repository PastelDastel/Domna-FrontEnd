import { useParams } from 'react-router-dom';
import style from './BlogArticlePage.module.css';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect } from 'react';
const BlogArticlePage = () => {
    const axiosPrivate = useAxiosPrivate();
    const id = useParams().id;


    useEffect(() => {

        const response = axiosPrivate.get(`/blog/${id}`);
        console.log(response.data);

    }, [id]);


    return (
        <div className={style.article}>
            <h1>Article {id}</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
            </p>

        </div>);
};

export default BlogArticlePage;