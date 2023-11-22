import React, { useState } from "react";
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useMutation } from '@apollo/client';
import { ADD_VIDEO, ADD_IMAGE } from '../utils/mutations';
import Auth from "../utils/auth.js";


const SecureUpload = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = Auth.loggedIn();
  console.log("User from context:", user);

  const [addVideo] = useMutation(ADD_VIDEO);
  const [addImage] = useMutation(ADD_IMAGE);

  const uploadFile = async (type) => {
    const folder = type === 'image' ? 'image' : 'video';

    const data = new FormData();
    data.append("file", type === 'image' ? img : video);
    data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/${folder}/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          console.log(e.loaded / e.total);
        }
      });

      return res.data; // Returning the response data directly
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!user || !user.data || !user.data._id) {
        console.error("No user ID found");
        alert('User ID not found. Please log in to continue.'); // User-friendly error message
        setLoading(false);
        return;
      }

      if (img && video) {
        const imgResult = await uploadFile('image');
        if (imgResult) {
          await addImage({
            variables: {
              public_id: imgResult.public_id,
              secure_url: imgResult.secure_url,
              user: user.data._id, // Using the logged-in user's ID
            }
          });
        }

        const videoResult = await uploadFile('video');
        if (videoResult) {
          await addVideo({
            variables: {
              public_id: videoResult.public_id,
              secure_url: videoResult.secure_url,
              user: user.data._id, // Using the logged-in user's ID
            }
          });
        }

        setImg(null);
        setVideo(null);
      } else {
        alert('Please add both a photo and a video');
      }

      setLoading(false);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Video">Video</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                const rvideo = document.createElement("source");
                document.querySelector("#vid").style.visibility = "visible";
                setVideo(reader.result);
                rvideo.src = reader.result;
                rvideo.setAttribute('type', file.type);
                document.querySelector("#vid").appendChild(rvideo);
              }
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="img">Image</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                const imgElement = document.createElement("img");
                document.querySelector("#pic").appendChild(imgElement);
                setImg(reader.result);
                imgElement.setAttribute('src', reader.result);
              }
            }}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>
      <video id="vid" controls style={{ visibility: 'hidden' }}></video>
      <div id="pic"></div>

      {loading && <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />}
    </div>
  );
};

export default SecureUpload;
