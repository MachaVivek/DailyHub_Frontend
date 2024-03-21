import react, { useEffect, useState } from "react";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';

const Picupload = () =>{
    const [email, setEmail] = useState("");
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "imgUrl" ? "images/" : "videos/";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            fileType === "imgUrl"
                ? setImgPerc(Math.round(progress))
                : setVideoPerc(Math.round(progress));
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
                default:
                    break;
            }
        },
        (error) => {
            console.log(error);
            switch (error.code) {
                case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    console.log(error);
                    break;
                case "storage/canceled":
                    // User canceled the upload
                    break;
                case "storage/unknown":
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                default:
                    break;
            }
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    console.log('DownloadURL - ', downloadURL);
                    setInputs((prev) => ({
                        ...prev,
                        [fileType]: downloadURL,
                    }));
                })
                .catch((error) => {
                    console.error("Error getting download URL:", error);
                });
        }
    );
};

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/picuploads`, { email, videoUrl: inputs.videoUrl, imgUrl: inputs.imgUrl });
            window.alert("Media uploaded successfully");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return(
      <div style={{backgroundColor:"#FF9F00",border:"4px solid black",padding:"9%"}} >
        {/* blurr the below */}
        <div style={{border:"4px solid blue",padding:"2%",backgroundColor:"rgba(255, 255, 255, 0.5",backdropFilter: "blur(8px)",boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 1 )",borderRadius:"15px"}}>
      <form onSubmit={handleSubmit} >
      <div className="form-group" style={{margin:"2%"}}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group"  style={{margin:"2%"}}>
          <label htmlFor="video">Video:</label>
          {videoPerc > 0 && <p className="text-muted">Uploading: {videoPerc}%</p>}
          <input
            type="file"
            className="form-control-file"
            accept="video/*"
            id="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>

        <br />

        <div className="form-group"  style={{margin:"2%"}}>
          <label htmlFor="img">Image:</label>
          {imgPerc > 0 && <p className="text-muted">Uploading: {imgPerc}%</p>}
          <input
            type="file"
            className="form-control-file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <br />

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
      </div>
    </div>
    )
}
export default Picupload