import HeroParaless from "./Courses Page Components/HeroParaless/HeroParaless";
import ParallaxSection from "./Courses Page Components/ParallaxSection/ParallaxSection";
import CourseArticle from "./Courses Page Components/CourseArticle/CourseArticle";
import ContactSection from "./Home Page Components/ContactSection/ContactSection";
const Courses = () => {
  return (
    <>
      <HeroParaless //this must not be parallax
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
      <CourseArticle
        name="DOMNA"
        period="Mensile"
        featuresList={["Preparazione Fisica", "Pancia Piatta", "Tonificazione"]}
        deniedList={["Anticellulite", "LIVE", "Bonus video decontrazione"]}
        price="39.00"
        whatToExpectHTML="<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sequi omnis nisi laboriosam quaerat aliquam eum quisquam iure earum, neque ex totam tempora libero maxime sed iusto quos, ipsam accusantium?</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dolorum nisi, iusto, natus eaque placeat odio alias quo adipisci tempore impedit quod vitae ea dicta? Itaque incidunt blanditiis quaerat ut!</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, velit ab! Mollitia esse sint atque! Inventore voluptatum eius assumenda molestias ut et, ipsum eveniet tempore est dolorem porro, tempora asperiores.</p>
"
      />
      <CourseArticle
        name="DOMNA"
        period="Semestrale"
        featuresList={["Preparazione Fisica", "Pancia Piatta", "Tonificazione"]}
        deniedList={["Anticellulite", "LIVE", "Bonus video decontrazione"]}
        price="235.00"
        discountedPrice="227.00"
        whatToExpectHTML="<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sequi omnis nisi laboriosam quaerat aliquam eum quisquam iure earum, neque ex totam tempora libero maxime sed iusto quos, ipsam accusantium?</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dolorum nisi, iusto, natus eaque placeat odio alias quo adipisci tempore impedit quod vitae ea dicta? Itaque incidunt blanditiis quaerat ut!</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, velit ab! Mollitia esse sint atque! Inventore voluptatum eius assumenda molestias ut et, ipsum eveniet tempore est dolorem porro, tempora asperiores.</p>
"
      />
      <CourseArticle
        name="DOMNA"
        period="Annuale"
        featuresList={["Preparazione Fisica", "Pancia Piatta", "Tonificazione"]}
        deniedList={["Anticellulite", "LIVE", "Bonus video decontrazione"]}
        price="470.00"
        discountedPrice="435.00"
        whatToExpectHTML="<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sequi omnis nisi laboriosam quaerat aliquam eum quisquam iure earum, neque ex totam tempora libero maxime sed iusto quos, ipsam accusantium?</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dolorum nisi, iusto, natus eaque placeat odio alias quo adipisci tempore impedit quod vitae ea dicta? Itaque incidunt blanditiis quaerat ut!</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, velit ab! Mollitia esse sint atque! Inventore voluptatum eius assumenda molestias ut et, ipsum eveniet tempore est dolorem porro, tempora asperiores.</p>
"
      />
      <ParallaxSection
        imageUrl="https://placehold.co/1920x1080/ffa0b1/f08b92"
        text="Corsi Domna Live"
        id="ParallaxSecondDivisor"
        startOffset={2000}
      />
      <CourseArticle
        name="DOMNA Live"
        period="Mensile"
        featuresList={[
          "Preparazione Fisica",
          "Pancia Piatta",
          "Tonificazione",
          "Anticellulite",
          "LIVE",
          "Bonus video deconcentrazione",
        ]}
        price="59.00"
        whatToExpectHTML="<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sequi omnis nisi laboriosam quaerat aliquam eum quisquam iure earum, neque ex totam tempora libero maxime sed iusto quos, ipsam accusantium?</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dolorum nisi, iusto, natus eaque placeat odio alias quo adipisci tempore impedit quod vitae ea dicta? Itaque incidunt blanditiis quaerat ut!</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, velit ab! Mollitia esse sint atque! Inventore voluptatum eius assumenda molestias ut et, ipsum eveniet tempore est dolorem porro, tempora asperiores.</p>
"
      />
      <CourseArticle
        name="DOMNA Live"
        period="Semestrale"
        featuresList={[
          "Preparazione Fisica",
          "Pancia Piatta",
          "Tonificazione",
          "Anticellulite",
          "LIVE",
          "Bonus video deconcentrazione",
        ]}
        price="355.00"
        discountedPrice="343.00"
        whatToExpectHTML="<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sequi omnis nisi laboriosam quaerat aliquam eum quisquam iure earum, neque ex totam tempora libero maxime sed iusto quos, ipsam accusantium?</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dolorum nisi, iusto, natus eaque placeat odio alias quo adipisci tempore impedit quod vitae ea dicta? Itaque incidunt blanditiis quaerat ut!</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, velit ab! Mollitia esse sint atque! Inventore voluptatum eius assumenda molestias ut et, ipsum eveniet tempore est dolorem porro, tempora asperiores.</p>
"
      />
      <CourseArticle
        name="DOMNA"
        period="Annuale"
        featuresList={[
          "Preparazione Fisica",
          "Pancia Piatta",
          "Tonificazione",
          "Anticellulite",
          "LIVE",
          "Bonus video deconcentrazione",
        ]}
        price="708.00"
        discountedPrice="658.00"
        whatToExpectHTML="<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sequi omnis nisi laboriosam quaerat aliquam eum quisquam iure earum, neque ex totam tempora libero maxime sed iusto quos, ipsam accusantium?</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dolorum nisi, iusto, natus eaque placeat odio alias quo adipisci tempore impedit quod vitae ea dicta? Itaque incidunt blanditiis quaerat ut!</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, velit ab! Mollitia esse sint atque! Inventore voluptatum eius assumenda molestias ut et, ipsum eveniet tempore est dolorem porro, tempora asperiores.</p>
"
      />
      <ContactSection />
    </>
  );
};

export default Courses;
