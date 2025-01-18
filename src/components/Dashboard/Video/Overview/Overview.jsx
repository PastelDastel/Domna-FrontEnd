import style from './Overview.module.css';

const Overview = ({ closeModal, video }) => {
    return (
        <div className={style.overviewVideo}>
            <h1>Dettagli del video</h1>
            <div>
                <h2>{video.Title}</h2>
                <p><strong>Descrizione:</strong> {video.Description ? video.Description : "No description provided"}</p>
                <p><strong>Url:</strong> <a href={video.Url} target="_blank" rel="noopener noreferrer">
                    {video.Url}
                </a></p>
            </div>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default Overview;