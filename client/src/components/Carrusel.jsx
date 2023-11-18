import React, { useState } from 'react';

const Carrusel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    const newIndex = (currentImage + 1) % images.length;
    setCurrentImage(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImage - 1 + images.length) % images.length;
    setCurrentImage(newIndex);
  };
  
//hay que ajustar imagen 

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={prevImage}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none"
      >
        Previous
      </button>
      <img
        src={images[currentImage]}
        alt={`Slide ${currentImage}`}
        className="mx-4 h-32 w-32 rounded" 
        style={{width: '400px', height: '400px'}} 
        />
      <button
        onClick={nextImage}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

export default Carrusel;