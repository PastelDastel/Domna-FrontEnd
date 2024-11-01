import { Link } from "react-router-dom";
import styles from "../style/Editor.module.css"; // Import the CSS module

const Editor = () => {
    return (
        <div className={styles.editorContainer}>
            <section className={styles.editorBox}>
                <h1>Editors Page</h1>
                <p>Apparently you the editor</p>
                <Link to="/" className={styles.homeLink}>Home</Link>
            </section>
        </div>
    );
}

export default Editor;
