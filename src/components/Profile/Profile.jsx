import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./Profile.module.css"; // Import the CSS module
import useLogout from "../../hooks/useLogout";
import MetaPixel from "../Global Components/MetaPixel";
const Months = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const Profile = () => {
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const displayDate = (date) => {
    // date: 21/12/2024, 02:47
    // returns 21 Dicembre 2024, 02:47
    const [day, month, year] = date.split("/");
    return `${day} ${Months[parseInt(month) - 1]} ${year}`;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        });
        if (isMounted) setUser(response.data.user);
        console.log(response.data.user);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching user data:", err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, axiosPrivate, navigate, location]);

  return (
    <>
      <MetaPixel
        pixelId={"410616855425028"}
        events={[
          {
            type: "ThisDudeIsOnTheProfilePage",
            params: { userId: user?.id },
          },
        ]}
      />
      <div className={styles.profileContainer}>
        <div className={styles.profileSidebar}>
          {user ? (
            <>
              <img
                src="https://placehold.co/150x150/ffaaff/ff4d94"
                alt="Foto Profilo"
                className={styles.profilePic}
              />
              <h2>{user.username}</h2>
              <p className={styles.userID}>User ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Telefono: {user.phone}</p>
              <p>Data creazione: {displayDate(user.creation_date)}</p>

              <button className={styles.editButton}>Modifica Password</button>
              <button className={styles.editButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p className={styles.noData}>No user data to display</p>
          )}
        </div>
        <div className={styles.profileContent}>
          {user ? (
            <>
              <h1>Dettagli del Corso</h1>
              <p>
                <strong>Corso Selezionato:</strong> Corso di Yoga Avanzato
              </p>
              <p>
                <strong>Data di Rinnovo:</strong> 15 Novembre 2024
              </p>
              <p>
                <strong>Dettagli:</strong> Questo corso include accesso
                illimitato a lezioni settimanali e supporto personalizzato con
                l&apos;istruttore.
              </p>
              <p>
                <strong>Video Corsi: </strong>
              </p>
              <p>
                <strong>Entra nella live : </strong>
                <a
                  href="https://us02web.zoom.us/j/85228193827?pwd=1DgSrBrwr8CREvFihMR9lv1jfPGC7m.1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clicca qui!
                </a>
              </p>
            </>
          ) : (
            <p className={styles.noCourseData}>No course data to display</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
