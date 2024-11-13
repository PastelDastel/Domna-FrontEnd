import { Link } from "react-router-dom";

const Section = ({
  title,
  content1,
  content2,
  linkText,
  link,
  imageUrl,
  reverse,
}) => {
  return (
    <div className={`relative flex flex-col lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""} items-center justify-center w-full mb-24`}>
      {/* Image Section */}
      <div
        className="w-full lg:w-[700px] h-[60vh] lg:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Text Section */}
      <div
        className={`absolute lg:relative ${reverse ? "lg:-mr-64" : "lg:-ml-64"} lg:mt-72 lg:-mb-12 top-1/2 lg:top-auto lg:left-auto transform -translate-y-1/2 lg:translate-y-0 lg:h-96 lg:w-1/3 bg-gray-900 text-white p-8 shadow-lg z-10`}
        style={{ maxWidth: "420px" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
        <p className="text-sm text-white md:text-base mb-4">{content1}</p>
        <p className="text-sm text-white md:text-base mb-4">{content2}</p>
        {link && (
          <Link
            to={link}
            className="inline-block px-4 py-2 mt-4 bg-pink-500 text-white font-bold rounded hover:bg-pink-600 transition-all duration-300"
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Section;
