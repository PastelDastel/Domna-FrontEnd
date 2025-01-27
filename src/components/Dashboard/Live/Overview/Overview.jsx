import style from './Overview.module.css';

const Overview = ({ closeModal, recording }) => {

    const displayDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    return (
        <div className={style["modal-overview-recording"]}>
            <h1>Dettagli {recording.Name}</h1>
            <div>
                <p><strong>Data: </strong>{displayDate(recording.Date)}</p>
                <p><strong>Nome:</strong> {recording.Name}</p>
                <p><strong>Descrizione:</strong> <span dangerouslySetInnerHTML={{ __html: recording.Description }}></span></p>
                <p><strong>URL:</strong> <a href={recording.Url} target="_blank" rel="noopener noreferrer">{recording.Url}</a></p>
            </div>
            <button onClick={closeModal}>Close</button>
        </div>
    )
};

export default Overview;