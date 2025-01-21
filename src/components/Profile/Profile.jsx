import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./Profile.module.css"; // Import the CSS module
import useLogout from "../../hooks/useLogout";
import MetaPixel from "../Global Components/MetaPixel";
import CourseList from "./CourseList";
import Swal from "sweetalert2";

const Profile = () => {
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [hasLiveBenefit, setHasLiveBenefit] = useState(false); // Separate state for LIVE benefit check
  const [showLives, setShowLives] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [link, setLink] = useState("");
  const [lives, setLives] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(true);

  const handleChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: `<div class="${styles.modalTitle}">Modifica Password</div>`,
      html: `
        <div class="${styles.modalContainer}">
          <label for="currentPassword" class="${styles.label}">Vecchia Password</label>
          <input type="password" id="currentPassword" class="${styles.inputField}" placeholder="Vecchia Password">

          <label for="newPassword" class="${styles.label}">Nuova Password</label>
          <input type="password" id="newPassword" class="${styles.inputField}" placeholder="Nuova Password">

          <label for="confirmPassword" class="${styles.label}">Conferma Password</label>
          <input type="password" id="confirmPassword" class="${styles.inputField}" placeholder="Conferma Password">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true, // Enables the "Nevermind" button
      confirmButtonText: `<span class="${styles.confirmButton}">OK</span>`,
      cancelButtonText: `<span class="${styles.cancelButton}">Nevermind</span>`, // Custom text for "Nevermind"
      customClass: {
        popup: styles.swalPopup,
        cancelButton: styles.cancelButton, // Custom class for "Nevermind" button
        confirmButton: styles.confirmButton, // Custom class for confirm button
      },
      preConfirm: () => {
        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!currentPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage("Tutti i campi sono obbligatori");
          return false;
        }
        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage("Le password non corrispondono");
          return false;
        }
        return { currentPassword, newPassword };
      },
    });

    if (formValues) {
      try {
        const response = await axiosPrivate.post(`/api/users/${id}/password`, formValues);
        Swal.fire("Successo!", `La tua password è stata cambiata in ${formValues.newPassword}`, "success");
      }
      catch (error) {
        console.error("Error changing password:", error);
        Swal.fire("Errore!", "Qualcosa è andato storto. Riprova più tardi.", "error");
      }
    }
  };

  // Other functions and useEffects remain unchanged
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Fetch User Data
  useEffect(() => {
    const controller = new AbortController();
    const fetchUserData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        });
        setUser(response.data.user);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching user data:", err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    fetchUserData();
    return () => {
      controller.abort();
    };
  }, [id, axiosPrivate, navigate, location]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}/courses`, {
          signal: controller.signal,
        });
        const fetchedCourses = response.data;
        setCourses(fetchedCourses);
        const liveBenefit = fetchedCourses.some(course => {
          return course.Benefits.some(benefit => {
            return benefit.Benefit.Name === "Live" && benefit.Type === "Included";
          });
        });
        setHasLiveBenefit(liveBenefit);
        if (liveBenefit) {
          const fetchLiveLink = async () => {
            try {
              const response = await axiosPrivate.get("/api/streaming/streaming-link");
              console.log(response.data.live.Url);
              setLink(response.data.live.Url);
            } catch (error) {
              console.error("Fetch live link error:", error);
            }
          };
          const fetchRecordings = async () => {
            try {
              const response = await axiosPrivate.get("/api/recordings");
              setLives(response.data);
              setGlobalLoading(false);
            } catch (error) {
              console.error("Fetch lives error:", error);
              setGlobalLoading(false);
            }
          };
          fetchLiveLink();
          fetchRecordings();
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
    return () => {
      controller.abort();
    };
  }, [id, axiosPrivate]);


  return (
    <>
      <MetaPixel pixelId={"410616855425028"} events={[{ type: "ThisDudeIsOnTheProfilePage", params: { userId: user?.id } }]} />
      <div className={styles.profileContainer}>
        <div className={styles.profileSidebar}>
          {user ? (
            <>
              <img src="https://placehold.co/150x150/ffaaff/ff4d94" alt="Foto Profilo" className={styles.profilePic} />
              <h2>{user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Telefono: {user.phone}</p>
              {hasLiveBenefit ? (
                <button className={styles.liveButton} onClick={() => setShowLives(!showLives)}>
                  {showLives ? "Vai ai corsi" : "Vai alle live"}
                </button>
              ) : (
                <p className={styles.noLive}>
                  Per accedere alle LIVE bisogna aver acquistato un corso DOMNA LIVE
                </p>
              )}
              <button className={styles.editButton} onClick={handleChangePassword}>
                Modifica Password
              </button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p className={styles.noData}>Log in to see your profile</p>
          )}
        </div>

        <div className={styles.profileContent}>
          {!showLives ? (
            <>
              {courses.length > 0 ? (
                <CourseList courses={courses} />
              ) : (
                <p className={styles.noCourseData}>
                  Iscriviti ad un corso per accedere a questa sezione
                </p>
              )}
            </>
          ) : (
            <>
              {hasLiveBenefit ? (<>
                {globalLoading ? (<>
                  <div>
                    <p>Loading Live section...</p>
                  </div>
                </>) : (<>
                  { //make the link open in a new tab
                    link ? (
                      <div className={styles.liveLink}>
                        <h1>Live Link</h1>
                        <a href={link} target="_blank" rel="noreferrer">Accedi alla live</a>
                      </div>) : (<p>No link available</p>)
                  }
                </>)}
              </>) : (<></>)}
            </>
          )}
        </div>

      </div >
    </>
  );
};

export default Profile;
