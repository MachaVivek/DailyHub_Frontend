import React from 'react'
const Aboutnews =()=>{
    return(
      <div style={{backgroundColor: "rgb(255, 218, 185)", height:"88vh",padding: '20px',margin: '0px', border: '8px solid black'}}>
        <div className="container my-5" >
      <h1 className="text-center mb-4">About Our News App</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>
            News serves as a vital cornerstone of democracy, providing citizens with crucial information about the world. 
            It empowers people, shapes opinions, and fosters informed decision-making. Removing fake news is essential as it preserves trust, ensures accurate public understanding, maintains social harmony, and upholds journalistic integrity, fostering a society where truth prevails.
          </p>

          <h2>How It Works</h2>
          <p>
            Our news app provides you with the latest and most reliable news
            sources. Here's how it works:
          </p>
          <ul>
            <li>Users can upload news articles to share with the community.</li>
            <li>View the latest news articles from various categories.</li>
            <li>Stay updated with the headlines from trusted sources.</li>
            <li>Explore news articles uploaded by other users.</li>
          </ul>
        </div>

        <div className="col-md-6">
          <h2>Features</h2>
          <ul>
            <li>Easy news article upload for users.</li>
            <li>Curated headlines from reliable sources.</li>
            <li>User-friendly interface for seamless navigation.</li>
            <li>Community-driven content sharing.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have questions or feedback? Feel free to contact us at{" "}
            <a href="mailto:vivekmernproject1@gmail.com">vivekmernproject1@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
    </div>
    )
}
export default Aboutnews