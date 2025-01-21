import style from './Overview.module.css';

const Overview = ({ closeModal, recording }) => {

    const displayDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    return (
        <div className={style["modal-overview-recording"]}>
            <h1>Dettagli {displayDate(recording.Date)}</h1>
            <div>
                <h2>{displayDate(recording.Date)}</h2>
                <p><strong>URL:</strong> <a href={recording.Url} target="_blank" rel="noopener noreferrer">{recording.Url}</a></p>
            </div>
            <button onClick={closeModal}>Close</button>
        </div>
    )
};

export default Overview;