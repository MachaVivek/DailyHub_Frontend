import React, { useEffect, useState } from "react";
import axios from "axios";
import "./story_component.css";
const StoryCards = () => {
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all submitted forms from the backend
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/storyfilesall`);
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const filteredForms = forms.filter(
    (form) =>
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.genere.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{backgroundColor: "#708328",padding: "2%",width: "100%",height: "100%"}}>
      <input
        type="text"
        placeholder="Search by title, genre, or author"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{padding: "15px",borderRadius: "5px",border: "1px solid #ccc"}}
      />
      <div className="story-container">
        {filteredForms.map((form) => (
          <div key={form._id}>
            <div className="story-card">
              <div className="story-image">
                <img
                  src={form.coverPicUrl} 
                  alt={form.title}
                />
                <h5 className="card-title" style={{ marginTop: "10%",fontWeight: "bold" }}>{form.title}</h5>
              </div>
              <div className="story-content">
                <h5 className="card-title">{form.title}</h5>
                <p className="card-text">Genre: {form.genere}</p>
                <p className="card-text">Author: {form.author}</p>
                <button
                  className="btn btn-primary"
                    onClick={() => {
                      window.location.href = `/storydashboard/viewstory/${form._id}`; // Corrected route path
                  }}
                  >
                  View Details
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryCards;
