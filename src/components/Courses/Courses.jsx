import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Course from './Course/Course';
import Hero from './Hero/Hero';
import style from './Courses.module.css';
import LoadingSpinnerCSS from "../Global Components/LoadingSpinner/LoadingSpinner.module.css";
import useAuth from '../../hooks/useAuth';
import MetaPixel from '../Global Components/MetaPixel';





// Funzione per leggere il cookie delle preferenze
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

// Recupera le preferenze dei cookie
const preferences = getCookie("cookiePreferences");
const marketingEnabled = preferences ? JSON.parse(preferences).marketing : false;


const Courses = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [domnaCourses, setDomnaCourses] = useState([]);
  const [domnaLiveCourses, setDomnaLiveCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const Domna = await axiosPrivate.get('/courses/domna');
        setDomnaCourses(Domna.data.courses);
        console.log(Domna.data.courses);
        const DomnaLive = await axiosPrivate.get('/courses/domna-live');
        setDomnaLiveCourses(DomnaLive.data.courses);
        console.log(DomnaLive.data.courses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [axiosPrivate]);
  return (
    <>

      {/* Carica MetaPixel solo se i cookie di marketing sono attivi */}
      {marketingEnabled && (
        <MetaPixel
          pixelId="778560713652344"
          eventOptions={{
            content_name: "Courses Page",
            content_category: "pageView",
            user_id: auth?.id || "guest"
          }}
        />
      )}


      {
        loading ? (<>
          <div className={LoadingSpinnerCSS.spinnerContainer}>
            <div className={LoadingSpinnerCSS.spinner}></div>
          </div>
        </>) : (<>
          {
            error && <p>{error}</p>
          }

          <div className={style.pageContainer}>
            <Hero text={"CORSI"} />
            <div className={style.parallaxFirst} id='first'>
              <p className={`${style.reviewTestimonial} ${style.firstP}`} id="firstP">DOMNA</p>
            </div>
            {
              domnaCourses.length > 0 ? (
                domnaCourses.map(course => <><Course key={course._id} course={course} />
                  <div className={style.courseSeparator}></div>
                </>
                )
              ) : (
                <p>No courses available in the DOMNA section.</p>
              )
            }
            <div className={style.parallaxFirst}>
              <p className={`${style.reviewTestimonial} ${style.secondP}`}>DOMNA + LIVE</p>
            </div>
            {
              domnaLiveCourses.length > 0 ? (
                domnaLiveCourses.map(course => <><Course key={course._id} course={course} />
                </>)
              ) : (
                <p>No courses available in the DOMNA + LIVE section.</p>
              )
            }
          </div></>)
      }</>

  );
};
export default Courses;