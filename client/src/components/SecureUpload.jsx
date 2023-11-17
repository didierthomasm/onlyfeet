import React, { useState } from "react";
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

const SecureUpload = () => {

  const [img, setImg] = useState(null),
        [video, setVideo] = useState(null),
        [loading, setLoading] = useState(false);


  const uploadFile = async (type) => {
    const folder = type === 'image' ? 'image' : 'video';

    const data = new FormData();
    data.append("file", type === 'image' ? img : video);
    data.append("upload_preset", type ==='image'?'images_preset':'videos_preset')



    try {

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/${folder}/upload`, data,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e)=>{
            console.log(e.loaded / e.total);
          }
      });

      const uploadData = {
        public_id: res.data.public_id,
        version: res.data.version,
        signature: res.data.signature,
        response: res.data
      }

      const serverRes = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/upload`, uploadData);

      return serverRes;
    } catch (error) {
      console.error(error);
    }

  }

  const getSignatureForUpload = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/sign-upload`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (img&&video) {
        //firma para subir imagen
        const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload();
        //subir img
        const imgUrl = await uploadFile('image', imgTimestamp, imgSignature);
        console.log({imgUrl})
      
        //firma para el video
        const { timestamp: videoTimestamp, signature: videoSignature } = await getSignatureForUpload('videos');
    
        //subir video
        const videoUrl = await uploadFile('video', videoTimestamp, videoSignature);
        console.log({videoUrl})
        setImg(null);
        setVideo(null);
      }else{
        alert('Debes agregar foto y video')
      }
    
  
      setLoading(false);
      e.target.reset();
    } catch (error) {
      console.error(error)
    }
  }


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
                // setVtype(file.type)
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onloadend = ()=>{
                  const rvideo = document.createElement("source")
                  document.querySelector("#vid").style.visibility = "visible"
                  setVideo(reader.result);
                  // console.log(video);
                  rvideo.src = reader.result
                  rvideo.setAttribute('type',file.type)
                  
                  document.querySelector("#vid").appendChild(rvideo)
                  // console.log(file);
                }
              }
            }
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
                reader.onloadend = ()=>{
                  const feetImg = document.createElement("img");
                  
                  document.querySelector("#pic").appendChild(feetImg)
                  setImg(reader.result);
                  feetImg.setAttribute('src',reader.result)
                }
              }
            }
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>
        <video id="vid" controls style={{visibility:'hidden'}}></video>
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

  )
}

export default SecureUpload