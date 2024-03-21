import React, { useEffect, useState } from "react";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';

const Storyupload = () => {
    const [title, setTitle] = useState("");
    const [genere, setGenere] = useState("");
    const [author, setAuthor] = useState("");
    const [img, setImg] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [filePerc, setFilePerc] = useState(0);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        file && uploadFile(file, "storyfileUrl");
    }, [file]);

    useEffect(() => {
        img && uploadFile(img, "coverPicUrl");
    }, [img]);

    const uploadFile = (file, fileType) => {
        const storage = getStorage(app);
        const folder = fileType === "coverPicUrl" ? "photos" : "files";
        const fileName = new Date().getTime() + "_" + file.name;
        const storageRef = ref(storage, folder + "/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                fileType === "coverPicUrl"
                    ? setImgPerc(Math.round(progress))
                    : setFilePerc(Math.round(progress));
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
                        console.log(error);
                        break;
                    case "storage/canceled":
                        break;
                    case "storage/unknown":
                        break;
                    default:
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log("DownloadURL - ", downloadURL);
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
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploadstoryfile`, {
                title,
                genere,
                coverPicUrl: inputs.coverPicUrl,
                storyfileUrl: inputs.storyfileUrl,
                author
            });
            window.alert("Media uploaded successfully");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container mt-5" style={{border:"3px solid black", padding:"2%",margin:"2%"}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="genre"
                        value={genere}
                        onChange={(e) => setGenere(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="file">Story File (PDF or DOCX):</label>
                    {filePerc > 0 && <p className="text-muted">Uploading: {filePerc}%</p>}
                    <input
                        type="file"
                        className="form-control-file"
                        // accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <br />

                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button type="submit" className="btn btn-primary">
                    Upload
                </button>
            </form>
        </div>
    )
}

export default Storyupload;
