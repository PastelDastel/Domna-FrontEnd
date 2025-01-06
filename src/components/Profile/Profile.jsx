import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./Profile.module.css"; // Import the CSS module
import useLogout from "../../hooks/useLogout";
import MetaPixel from "../Global Components/MetaPixel";
import VideoSDK from "./VideoSDK/VideoSDK";
import { getLastRecordingBasedOnRoomId, getTodayRoomID } from "./VideoSDK/API";
import CourseList from "./CourseList";
import Swal from "sweetalert2";

const Profile = () => {
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [hasLiveBenefit, setHasLiveBenefit] = useState(false); // Separate state for LIVE benefit check
  const [loadingRecordings, setLoadingRecordings] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [showLives, setShowLives] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track the selected video
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

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
        console.log("Password change response:", response.data);
      }
      catch (error) {
        console.error("Error changing password:", error);
        Swal.fire("Errore!", "Qualcosa è andato storto. Riprova più tardi.", "error");
      }
      console.log(formValues);
      Swal.fire("Successo!", `La tua password è stata cambiata in ${formValues.newPassword}`, "success");
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

  // Fetch Courses Data
  useEffect(() => {
    const controller = new AbortController();
    getTodayRoomID();
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}/courses`, {
          signal: controller.signal,
        });
        const fetchedCourses = response.data;
        setCourses(fetchedCourses);
        console.log("Fetched Courses:", fetchedCourses);
        // Check if any course has LIVE benefit
        const liveBenefit = fetchedCourses.some(course =>
          course.benefits.includes("LIVE")
        );
        setHasLiveBenefit(liveBenefit);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching courses:", err);
        }
      }
    };

    fetchCourses();

    return () => {
      controller.abort();
    };
  }, [id, axiosPrivate]);
  // Scroll Listener (with passive: true)
  useEffect(() => {
    const handleScroll = () => {
      console.log("User is scrolling the page with video.");
    };

    // Attach scroll listener with passive: true
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Fetch Recordings if LIVE benefit exists
  useEffect(() => {
    if (hasLiveBenefit) {
      const fetchRecordings = async () => {
        setLoadingRecordings(true);
        try {
          console.log("Fetching recordings...");
          const fetchedRecordings = await getLastRecordingBasedOnRoomId();
          const filteredRecordings = fetchedRecordings.filter(recording => {
            // Exclude recordings that are in progress or incomplete
            return recording.status !== "in-progress";
          });
          setRecordings(filteredRecordings || []); // Default to empty array if no valid recordings
          console.log("Filtered Recordings: ", filteredRecordings);
        } catch (error) {
          console.error("Error fetching recordings:", error);
          setRecordings([]); // Set to empty array in case of error
        } finally {
          setLoadingRecordings(false);
        }
      };

      fetchRecordings();
    }
  }, [hasLiveBenefit]);

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
              {loadingRecordings ? (
                <p className={styles.loading}>Getting live recordings, please wait...</p>
              ) : (
                <>
                  {hasLiveBenefit ? (
                    <>
                      <VideoSDK user={user} meetingId={getTodayRoomID()} />

                      {recordings.length > 0 ? (
                        <>
                          <h1>Registrazioni</h1>
                          {recordings.map(recording => {
                            const formattedDate = new Date(recording.file.createdAt).toLocaleDateString("it-IT", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            });

                            return (
                              <div key={recording.id} className={styles.recordingDetail}>
                                <button
                                  className={styles.recordingButton}
                                  onClick={() => setSelectedVideo(recording.file.fileUrl)}
                                >
                                  Live del {formattedDate}
                                </button>
                              </div>
                            );
                          })}

                          {selectedVideo && (
                            <div className={styles.videoSection}>
                              <video
                                controls
                                src={selectedVideo}
                                className={styles.recordingVideo}
                                disablePictureInPicture={true}
                                controlsList="nodownload"
                                //disable download possibility
                                onContextMenu={e => e.preventDefault()}
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </>
                      ) : (
                        <p>Non ci sono registrazioni disponibili</p>
                      )}
                    </>
                  ) : (
                    <p className={styles.noLiveData}>
                      Iscriviti ad un corso DOMNA LIVE per accedere a questa sezione
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>

      </div >
    </>
  );
};

export default Profile;
