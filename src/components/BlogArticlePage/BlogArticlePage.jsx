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

    }, [id]);


    return (
        <div className={style.article}>
            <h1 className={style.title}>Article {id}</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus similique cumque voluptas corporis quidem recusandae, dicta error optio iure inventore nulla ad quisquam minima ipsa delectus dolor totam nobis.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, minima cum ipsum nostrum ea totam ad deleniti porro exercitationem ex incidunt accusamus cupiditate distinctio facilis assumenda vel nulla eveniet nam!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam facere maxime placeat, distinctio harum, velit adipisci culpa alias officiis laudantium cupiditate repudiandae debitis commodi doloribus quaerat esse a autem odio!
            </p>

        </div>);
};

export default BlogArticlePage;