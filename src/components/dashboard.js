import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import CircleLoader from "react-spinners/CircleLoader";
import "./components1.css";
import chati from "../images/dashboard_chat.jpg"
import moneyi from "../images/dashboard_money.jpg"
import gamesi from "../images/dashboard_games.webp"
import storyi from "../images/dashboard_stories.jpg"
import newsi from "../images/dashboard_news.jpg"
import dairyi from "../images/dashboard_dairy.jpg"
const Hexagon = () => {
  return <div className="hexagon"></div>;
};
function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading]= useState(false);
    useEffect(() => {
        setLoading(true);
        window.onload = () => {
            setLoading(false); 
        };
        return () => {
            window.onload = null;
        };
    }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        var token;
        try{
          token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        }catch(error){
          alert('Tokens not present');
          navigate('/loginpage');
          return;
        }
        if (!token) {
          alert('Please login first');
          navigate('/loginpage');
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/loginpage');
        // clear the token in the document cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
      }
    };

    fetchUserData();
  }, []);
  const cards = [
    {
      image: chati,
      title: "Chat with friends",
      description: "Join our chat website by entering a unique username and a room ID of your choice. Connect with friends using the same room ID to chat together seamlessly. Experience real-time communication with your friends in the same room, making conversations more engaging and fun!",
      link: "/join"
    },
    {
      image: moneyi,
      title: "Money Tracker",
      description: "Manage your finances effortlessly with our intuitive money tracker website. Track your expenses, income, and overall financial health through our user-friendly dashboard. Input transactions easily with dedicated forms, helping you stay on top of your budget with ease.",
      link: "/moneytrackerdashboard/moneydashboard"
    },
    {
      image: dairyi,
      title: "Daily Dairy",
      description: "Experience the joy of journaling securely with our website, where you can document your daily life moments, favorite places, foods, and cherished memories—all encrypted for your privacy. Upload and revisit your treasured photos and videos anytime, creating a personalized digital diary that's both private and accessible.",
      link: "/dairydashboard/dailydairy"
    },
    {
      image: storyi,
      title: "Read Stories",
      description: "Introducing DreamFables: Your ultimate bedtime companion! Dive into a world of endless stories crafted to inspire sweet dreams. With an infinite library at your fingertips, relax, unwind, and drift off into a peaceful slumber every night.",
      link: "/storydashboard/allstories"
    },
    {
      image: newsi,
      title: "News",
      description: "Welcome to our news website where you can stay updated with the latest headlines. We understand the importance of accessibility, so in addition to reading, you can also listen to the news updates. Stay informed, whether you're reading or listening, with our user-friendly platform.",
      link: "/newsdashboard/headlines"
    },
    {
      image: gamesi,
      title: "Games",
      description: "Welcome to our addictive 2048 game website! Challenge your mind with strategic tile merging to reach the elusive 2048 tile. With sleek design and smooth gameplay, it's the perfect way to test your skills and beat your high score!",
      link: "/game2048"
    }
  ].slice(0, 6); // Only use the first 5 cards

  return (

    
    <>
  {userData && (
        <div className="container" style={{ marginTop: "5%" }}>
          <div className="row">
            {cards.map((card, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card-dashboard h-100 ">
                  {/* make acher tag as button */}
                  <a href={card.link}>
                    <img src={card.image} alt={card.title} className="card-dashboard-img-top" style={{width:"100%"}} />
                  </a>
                  <div className="card-dashboard-body">
                    <h2 className="card-dashboard-title">{card.title}</h2>
                    <p className="card-dashboard-text">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    
    </>
  );
}

export default Dashboard;
