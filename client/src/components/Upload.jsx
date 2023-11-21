import React, { useState } from "react";
import axios from 'axios';
import {TailSpin} from 'react-loader-spinner'



const Upload = ()=> {

const [img, setImg] =useState(null);
const [video, setVideo] =useState(null);
const [loading, setLoading] =useState(false);

const uploadFile=async(type)=>{
    const data = new FormData();
    data.append("file", type==='image'? img:video);
    data.append("upload_preset", type ==='image'?'images_preset':'videos_preset');

    try{
        let cloudName=import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
        console.log(import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME)
        let resourceType=type==='image'?'image':'video';
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
        console.log(cloudName)

        const res = await axios.post(api, data);
        const {secure_url}=res.data;
        console.log(secure_url);
        return secure_url;
    } catch (error){
        console.error(error);
    }

}


const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
        setLoading(true);
        //subir img
        const imgUrl = await uploadFile('image');
        //subir video
        const videoUrl=await uploadFile('video');

        // //mandar backend api request
        // await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/videos`,{imgUrl, videoUrl})

        //resetear

        setImg(null);
        setVideo(null);

        console.log("File upload successful")
        setLoading(false);




    }catch (error){
        console.error(error)
    }
}


return(
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Video">Video</label>
                <br />
                <input
                type="file"
                accept="video/*"
                id="video"
                onChange={(e)=>setVideo((prev)=>e.target.files[0])}
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
                onChange={(e)=>setImg((prev)=>e.target.files[0])}
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

)
}

export default Upload