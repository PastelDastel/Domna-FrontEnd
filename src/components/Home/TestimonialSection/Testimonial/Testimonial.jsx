import React from "react";

const Testimonial = ({ image, name, role, text, rating }) => {
  // Generate stars based on the rating prop (full and half stars)
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
    } else if (i - rating === 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-gray-400"></i>);
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-16 text-center w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto shadow-lg h-[400px] md:h-[500px]">
      <img
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-pink-300 mb-4 mx-auto"
        src={image}
        alt={`${name}'s profile`}
      />
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-800">{name}</h3>
      <p className="text-base sm:text-lg text-gray-500 mb-2 sm:mb-4">{role}</p>
      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 mb-4 sm:mb-6">{text}</p>
      <div className="flex justify-center space-x-1">{stars}</div>
    </div>
  );
};

export default Testimonial;
