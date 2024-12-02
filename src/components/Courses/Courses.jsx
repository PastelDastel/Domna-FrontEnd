import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Course from './Course/Course';
import Hero from './Hero/Hero';
import style from './Courses.module.css';

const Courses = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get('/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [axiosPrivate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter courses by their section
  const domnaCourses = courses.filter(course => course.section === 'DOMNA');
  const domnaLiveCourses = courses.filter(course => course.section === 'DOMNA LIVE');

  return (
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
    </div>
  );
};

export default Courses;
