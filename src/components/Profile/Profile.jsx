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

  const sanitizeYouTubeUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      const videoId = parsedUrl.searchParams.get("v");
      return `https://www.youtube.com/watch?v=${videoId}`;
    } catch (err) {
      console.error("Invalid YouTube URL:", url);
      return url; // Fallback to the original URL if parsing fails
    }
  };

  const getVideoTitle = async (url) => {
    try {
      const sanitizedUrl = sanitizeYouTubeUrl(url);
      const videoId = new URL(sanitizedUrl).searchParams.get("v");
      const response = await axios.get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      return response.data.title;
    } catch (err) {
      console.error("Error fetching video title:", err);
      return "Video";
    }
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

        // Fetch video titles for each course
        const updatedCourses = await Promise.all(
          response.data.map(async (course) => {
            if (course.videos && course.videos.length > 0) {
              const videoTitles = await Promise.all(
                course.videos.map((video) => getVideoTitle(video))
              );
              const sanitizedVideos = course.videos.map((video) =>
                sanitizeYouTubeUrl(video)
              );
              return { ...course, videoTitles, sanitizedVideos };
            }
            return course;
          })
        );

        if (isMounted) {
          setCourses(updatedCourses);
          console.log("User courses:", updatedCourses);
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
                  {course.videoTitles && course.videoTitles.length > 0 && (
                    <div className={styles.videosSection}>
                      <h3>Video del corso:</h3>
                      <ul className={styles.videoList}>
                        {course.sanitizedVideos.map((video, index) => (
                          <li key={index}>
                            <button
                              className={styles.videoButton}
                              onClick={() => window.open(video, "_blank")}
                            >
                              {course.videoTitles[index]}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
