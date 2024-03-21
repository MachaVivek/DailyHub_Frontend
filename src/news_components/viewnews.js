import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";

const Viewnews =()=>{
    const { id } = useParams();
    const [posts, setPosts] = useState([[0]]);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/readnews/${id}`)
        .then((res) => {
            setPosts(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <div className="container my-5 custom-border-container" >
            <div className="card custom-border-container" >
                {posts.length > 0 && (
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">{posts[0].title}</h2>

                    <div className="row mb-3 custom-border-container">
                    <div className="col-md-6">
                        <h4 className="mb-2">Heading</h4>
                        <p>{posts[0].heading}</p>
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-2">District</h4>
                        <p>{posts[0].district}</p>
                        <h4 className="mb-2">Location</h4>
                        <p>{posts[0].location}</p>
                    </div>
                    </div>

                    <div className="mb-4 custom-border-container">
                    <h4>Body</h4>
                    <div className="border p-3">{posts[0].body}</div>
                    </div>

                    <div className="mb-4 custom-border-container">
                    <h4>Conclusion</h4>
                    <div className="border p-3">{posts[0].conclusion}</div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
export default Viewnews