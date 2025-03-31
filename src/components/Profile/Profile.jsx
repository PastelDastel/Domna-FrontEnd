import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./Profile.module.css"; // Import the CSS module
import useLogout from "../../hooks/useLogout";
import CourseList from "./CourseList";
import Swal from "sweetalert2";
import ThumbnailImage from "../../assets/PNG/sfondo grigio.png"
import M from "../../assets/PNG/letter-m.png"
import RecordingTrack from "./RecordingTrack";


import useAuth from "../../hooks/useAuth";

import StripeCheckout from "../Stripe/StripeCheckout";
import { createRoot } from "react-dom/client"; // Import createRoot for React 18+
import withReactContent from "sweetalert2-react-content";
const Profile = () => {

  const mySwal = withReactContent(Swal);



  const { auth } = useAuth();




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

  const [playingRecording, setPlayingRecording] = useState(null); // Stores the selected recording
  const [isPlaying, setIsPlaying] = useState(false); // Tracks whether a recording is playing

  const onPlay = (id) => {
    const selectedRecording = lives.find((live) => live._id === id);
    setPlayingRecording(selectedRecording);
    setIsPlaying(true); // Start playback
  };

  const stopPlayback = () => {
    setPlayingRecording(null);
    setIsPlaying(false); // Stop playback
  };



  const handleChangePassword = async () => {
    const openStripeModal = async () => {
      // Show modal with empty HTML, just mount React component inside
      await mySwal.fire({
        title: `<div class="${styles.modalTitle}">Modifica Metodo Pagamento</div>`,
        html: <StripeCheckout axiosPrivate={axiosPrivate} />,
        focusConfirm: false,
        confirmButtonText: `<span class="${styles.cancelButton}">Chiudi</span>`,
        customClass: {
          popup: styles.swalPopup,
          cancelButton: styles.cancelButton,
          confirmButton: styles.confirmButton,
        },

        preConfirm: () => {
          // puoi fare controlli se servono
          return true;
        }
      });
    };
    await openStripeModal();
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
            console.log("Course:", course);
            console.log("Benefit:", benefit.Benefit.Name);
            return benefit.Benefit.Name === "Live" && benefit.Type === "Included";
          });
        });
        setHasLiveBenefit(liveBenefit);
        if (liveBenefit) {
          const fetchLiveLink = async () => {
            try {
              const response = await axiosPrivate.get("/api/streaming/streaming-link");
              console.log("Benefici del utente:", response.data.live.Url);
              setLink(response.data.live.Url);
            } catch (error) {
              console.error("Fetch live link error:", error);
            }
          };
          const fetchRecordings = async () => {
            try {
              const response = await axiosPrivate.get("/api/recordings/week");
              setLives(response.data.recordings);
              console.log("Recordings:", response.data.recordings);
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
  const getDayandMonthandYear = (date) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("it-IT", options); // Specifica la lingua italiana
  };
  return (
    <>
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
                Modifica Metodo di Pagamento
              </button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p className={styles.noData}>Accedi per vedere il tuo profilo</p>
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
                  <div className={styles["video-container"]}> {/* Change the wrapper to a flex container */}
                    <h1>Registrazioni</h1>
                    {lives.map((live) => {
                      if (live?.recording) return null
                      const isCurrentPlaying = playingRecording && playingRecording._id === live._id;
                      return (
                        <div key={live._id} className={styles["video-card"]}> {/* Keep individual card styling */}
                          <div
                            className={styles["video-button"]} // Separated button-like div
                            onClick={() => onPlay(live._id)}
                            role="button"
                            aria-label={`Play video recorded on ${getDayandMonthandYear(live.Date)}`}
                          >
                            <div className={styles["thumbnail"]}>
                              <img
                                src={ThumbnailImage}
                                alt="Immagine registrazione"
                                onError={(e) => (e.target.src = "https://placehold.co/192x108")}
                              />
                              <span className={styles["duration"]}>
                                {live.Duration || "40:00"}
                              </span>
                            </div>
                            <div className={styles["video-details"]}>
                              <img src={M} alt="M Icon" />
                              <div className={styles["info"]}>
                                <h3 className={styles["title"]}>
                                  <p>{live.Name}</p>
                                  <p>{getDayandMonthandYear(live.Date)}</p>
                                </h3>
                                <p
                                  className={styles["meta"]}
                                  dangerouslySetInnerHTML={{
                                    __html: live.Description
                                      ? `${live.Description}<br />${live.Views || "100M"} Visualizzazioni`
                                      : "Descrizione non disponibile + live.views etc..",
                                  }}
                                ></p>
                              </div>
                            </div>
                          </div>
                          {/* RecordingTrack appears immediately after the clickable area */}
                          {isCurrentPlaying && (
                            <div className={styles["recording-wrapper"]}>
                              <RecordingTrack
                                isCompleted={false}
                                recordingUrl={playingRecording.Url}
                                recordingId={playingRecording._id}
                                recordingName={playingRecording.Name}
                                onRecordingUpdate={(update) => console.log("Recording updated:", update)}
                                isPlaying={isPlaying}
                                onPlay={(id) => {
                                  setPlayingRecording(lives.find((live) => live._id === id));
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>)}
              </>) : (<>
                <p className={styles.noLive}>
                  Per accedere alle LIVE bisogna aver acquistato un corso DOMNA LIVE
                </p>
              </>)}
            </>
          )}
        </div>
      </div >
    </>
  );
};

export default Profile;










