import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import HeroParaless from './HeroParaless/HeroParaless';
import ParallaxSection from './ParallaxSection/ParallaxSection';
import CourseArticle from './CourseArticle/CourseArticle';
import ContactSection from '../Home/Contact Section/ContactSection';

const Courses = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get('/courses');
        console.log(response.data);
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

  return (
    <>
      <HeroParaless
        text="Corsi"
        animatedText="Ritorna nella tua forma migliore con i corsi Domna"
        textAlignment="center"
      />
      <ParallaxSection
        imageUrl="https://placehold.co/1920x1080/ffa0b1/f08b92"
        text="Corsi Domna"
        id="ParallaxFirstDivisor"
        startOffset={100}
      />
      {/* Render courses with section "DOMNA" */}
      {courses
        .filter((course) => course.section === "DOMNA")
        .map((course) => (
          <CourseArticle
            key={course._id}
            name={course.title}
            period={course.dutation}
            featuresList={course.benefits}
            deniedList={course.excluded_benefits}
            price={course.price}
            discountedPrice={course.discountedPrice}
            whatToExpectHTML={course.description}
          />
        ))}

      <ParallaxSection
        imageUrl="https://placehold.co/1920x1080/ffa0b1/f08b92"
        text="Corsi Domna Live"
        id="ParallaxSecondDivisor"
        startOffset={2000}
      />
      {/* Render courses not in section "DOMNA" */}
      {courses
        .filter((course) => course.section !== "DOMNA")
        .map((course) => (
          <CourseArticle
            key={course._id}
            name={course.title}
            period={course.dutation}
            featuresList={course.benefits}
            deniedList={course.excluded_benefits}
            price={course.price}
            discountedPrice={course.discountedPrice}
            whatToExpectHTML={course.description}
          />
        ))}

      <ContactSection />
    </>
  );
};

export default Courses;
