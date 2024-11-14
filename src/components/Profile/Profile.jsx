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
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const displayDate = (date) => {
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

    const getUserData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setUser(response.data.user);
          console.log("User data:", response.data.user);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching user data:", err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    const getUserCourses = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}/courses`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setCourses(response.data);
          console.log("User courses:", response.data);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching user courses:", err);
        }
      }
    };

    getUserData();
    getUserCourses();

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
          {courses.length > 0 ? (
            <>
              <h1>I Tuoi Corsi</h1>
              {courses.map((course) => (
                <div key={course._id} className={styles.courseDetail}>
                  <h2>{course.title}</h2>
                  <p>
                    <strong>Descrizione:</strong> {course.description}
                  </p>
                  <p>
                    <strong>Durata:</strong> {course.duration}
                  </p>
                  <p>
                    <strong>Sezione:</strong> {course.section}
                  </p>
                  <p>
                    <strong>Insegnante:</strong> {course.instructor}
                  </p>
                  <p>
                    <strong>Benefici:</strong> {course.benefits.join(", ")}
                  </p>
                  <p>
                    <strong>Benefici esclusi:</strong>{" "}
                    {course.excluded_benefits.join(", ")}
                  </p>
                  <p>
                    <strong>Prezzo:</strong> €{course.price.toFixed(2)}
                  </p>
                </div>
              ))}
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
