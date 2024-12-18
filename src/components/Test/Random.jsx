import { useState, useEffect } from 'react';
import style from './Random.module.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ReactPlayer from 'react-player';
const Random = () => {
    const axios = useAxiosPrivate();
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('/api/video/videos');
                setVideos(response.data.videos);
            } catch (error) {
                console.error('Failed to fetch videos:', error);
            }
        };
        fetchVideos();
    }, [axios]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        const response = await axios.post('/api/video/create', {
            videoUrl: data.VideoUrl,
            title: data.VideoTitle,
            description: data.VideoDescription
        })
        console.log(response);
    };
    console.log(videos);
    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <h2>Video URL</h2>
                <input type="text" placeholder="Enter Video URL" name='VideoUrl' />
                <h2>Title</h2>
                <input type="text" placeholder="Enter Title" name='VideoTitle' />
                <h2>Description</h2>
                <textarea placeholder="Enter Description" name='VideoDescription' />
                <button>Submit</button>
            </form>

            <div>
                <h2>Video List</h2>
                <div className={style.videoList}>
                    {videos.map((video) => (
                        <div key={video.id}>
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=I2O7blSSzpI'}
                                controls
                                width="100%"
                                height="auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Random;