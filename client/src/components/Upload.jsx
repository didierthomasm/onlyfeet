import React, { useState, useContext } from "react";
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useMutation } from '@apollo/client';
import { ADD_VIDEO, ADD_IMAGE } from '../utils/mutations'; 
import { UserContext } from '../context/UserContext'; 

const Upload = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [addVideo] = useMutation(ADD_VIDEO);
  const [addImage] = useMutation(ADD_IMAGE);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === 'image' ? img : video);
    data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

    try {
      let cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!user || !user._id) {
        console.error("No user ID found");
        return;
      }

      if (img && video) {
        const imgResult = await uploadFile('image');
        if (imgResult) {
          await addImage({
            variables: {
              public_id: imgResult.public_id,
              secure_url: imgResult.secure_url,
              user: user._id, // Using the logged-in user's ID
            }
          });
        }

        const videoResult = await uploadFile('video');
        if (videoResult) {
          await addVideo({
            variables: {
              public_id: videoResult.public_id,
              secure_url: videoResult.secure_url,
              user: user._id, // Using the logged-in user's ID
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
            onChange={(e) => setVideo(e.target.files[0])}
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
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>

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

export default Upload;
