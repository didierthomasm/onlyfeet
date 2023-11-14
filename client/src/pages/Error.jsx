import { useRouteError } from 'react-router-dom';
import * as errors from '../assets/img/Errors/error.js';

// Array of images
const images = [errors.img1, errors.img2, errors.img3, errors.img4];

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Randomly select an image
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <img src={randomImage} alt='Code 404 Not Found' className='w-auto max-h-[47rem]'/>
  );
}
