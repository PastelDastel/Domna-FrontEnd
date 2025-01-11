const Overview = ({ closeModal, video }) => {
    return (
        <div>
            <h1>Overview</h1>
            <div><h2>{video.Title}</h2>
                <div>{video.Description ? video.Description : "No description provided"}</div>
                <div>{video.Url}</div>
            </div>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default Overview;