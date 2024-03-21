import React from "react";
import home_background_img from "../images/home_page_background.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';
const Aboutwebsite = () => {
    return (
        <div className="aboutWebsite" style={{ overflowY: "auto", backgroundImage: `url(${home_background_img})`, height: "100vh", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="container" style={{justifyContent:"center",alignItems:"center"}} >
            <div className="row" style={{margin:"20px"}}>
                
                <div className="col-md-4" >
                    <div className="card mb-4" style={{border:"4px solid black",padding:"10px",}}>
                        <div className="card-body" >
                            <h5 className="card-title" style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>Title: Dive into the Puzzle World of 2048</h5>
                            <p className="card-text">Embark on a journey of strategic tile merging in the captivating world of 2048. In this addictive puzzle game, your goal is to reach the elusive 2048 tile by skillfully sliding numbered tiles across the board. The game presents a 4x4 grid where tiles with powers of 2 appear randomly. Your task is to maneuver these tiles, combining identical numbers to double their value and ultimately reach the coveted 2048 tile. As you merge tiles, your score increases, rewarding your strategic prowess and progress.</p>
                            <p>
                            To play 2048, use the arrow keys on your keyboard to slide the tiles in the desired direction—up, down, left, or right. When tiles with the same number collide upon sliding, they merge into one, doubling the value. Your objective is to keep merging tiles strategically to prevent the board from filling up while aiming to reach the elusive 2048 tile. The game ends when no more moves are possible, or when you achieve the 2048 tile. With sleek design, smooth gameplay, and a simple yet challenging concept, 2048 offers endless hours of entertainment for puzzle enthusiasts and casual gamers alike. Strategize, merge, and conquer your way to victory in this captivating puzzle adventure!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title" style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>Title: Chat Application User Guide</h5>
                            <p className="card-text">
                            The chat application offers a seamless platform for users to connect and communicate with friends in real-time. To get started, simply navigate to the "Join" page by clicking on the provided link. Here, enter your desired username and the room ID you wish to join. Once entered, click the "Sign In" button to proceed to the chat room.
                            </p>
                            <p>
                            Upon entering the chat room, you'll be greeted with a sleek interface displaying the room name and an option to close the chat. The main chat window features a scrollable message section where you can view messages from other users. To send a message, type your text in the input field at the bottom and press the "Send" button or hit Enter on your keyboard. Your messages will appear in the chat alongside those of other users, facilitating smooth and engaging conversations.
                            </p>
                            <p>
                            With its user-friendly design and real-time messaging capabilities, the chat application provides a convenient and enjoyable way to stay connected with friends and engage in meaningful conversations. Whether you're catching up with old friends or collaborating with colleagues, the chat application offers a seamless communication experience for all users.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title" style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>Title: Explore Your Digital Diary</h5>
                            <p className="card-text">
                            The Dairy Dashboard is your gateway to a personalized digital diary experience, offering a range of features to document and cherish your memories. Seamlessly navigate through different sections of your diary using the intuitive navigation menu provided in the dashboard. Whether you're jotting down your daily thoughts, reminiscing about your favorite places, relishing memorable meals, cherishing special moments with loved ones, or recounting fascinating incidents, the Dairy Dashboard caters to all your journaling needs.
                            </p>
                            <p>
                            From writing daily entries to uploading images that capture precious moments, the Dairy Dashboard empowers you to curate a rich collection of memories. Dive into your favorite places, relive culinary delights, cherish meaningful connections, and immortalize memorable stories—all within the comfort of your digital diary. With a user-friendly interface and seamless navigation, the Dairy Dashboard offers a convenient and enjoyable journaling experience for users of all ages.
                            </p>
                            <p>
                            Whether you're a seasoned diary enthusiast or new to the world of digital journaling, the Dairy Dashboard provides the perfect platform to capture, preserve, and revisit your life's moments. Start your journaling journey today and create a timeless collection of memories with the Dairy Dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title" style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>Title: Dive into Stories: Your Personal Storybook</h5>
                            <p className="card-text">
                            The Story Dashboard serves as your gateway to a world of captivating narratives, providing a seamless platform to explore and immerse yourself in an array of stories. Featuring an intuitive navigation menu, users can effortlessly navigate through different sections of their digital storybook. Whether you're seeking to read captivating tales, discover new genres, or revisit old favorites, the Story Dashboard caters to all your literary cravings.
                            </p>
                            <p>
                            Designed to offer convenience and accessibility, the Story Dashboard allows users to delve into an extensive collection of stories curated for readers of all ages and interests. From heartwarming tales to thrilling adventures, the dashboard provides a diverse selection of narratives to suit every mood and preference. Whether you're unwinding before bedtime or seeking inspiration during your downtime, the Story Dashboard offers an enriching reading experience that transports you to new worlds and sparks your imagination.
                            </p>
                            <p>
                            API Usage:
                            The ViewFormDetails component leverages an external API to enrich the reading experience by providing additional information related to the story content. Upon entering text in the input field and clicking the "Get information" button, the application sends a request to the Words Definitions Dictionary and Data API. The API returns relevant information such as word definitions, synonyms, and antonyms, enhancing the user's understanding and engagement with the story content. This integration adds value to the reading experience by providing users with comprehensive insights and enriching their literary exploration.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title" style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>Title: Introducing the News application: Your Gateway to Stay Informed</h5>
                            <p className="card-text">
                            The News Dashboard is a comprehensive platform designed to deliver the latest headlines and news updates, offering users a seamless experience for accessing and consuming information. With its intuitive interface and user-friendly features, the News Dashboard serves as a centralized hub for staying informed and up-to-date on current events.
                            </p>
                            <p>
                            Featuring an array of functionalities, the News Dashboard empowers users to explore news articles based on their interests and preferences. Through interactive search capabilities, users can effortlessly browse headlines by district, enabling them to find relevant news stories quickly and efficiently. Additionally, the dashboard provides detailed information about each news article, including its title, heading, district, and location, ensuring users have access to comprehensive coverage of the latest developments.
                            </p>
                            <p>
                            Moreover, the News Dashboard goes beyond traditional news consumption by offering innovative features such as voice synthesis. Users can utilize speech synthesis to listen to news articles being read aloud, providing an accessible and convenient way to consume content. With customizable speech rates and voice options, users can tailor their listening experience to suit their preferences, enhancing accessibility and inclusivity.
                            </p>
                            <p>
                            Whether users are seeking to catch up on the latest headlines, explore in-depth news coverage, or listen to news articles on the go, the News Dashboard offers a versatile and dynamic platform for accessing news content. By combining cutting-edge technology with user-centric design, the News Dashboard redefines the news consumption experience, empowering users to stay informed, engaged, and connected to the world around them.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title" style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>Title: Manage Your Finances Seamlessly with the Money Tracker Dashboard</h5>
                            <p className="card-text">
                            The Money Tracker Dashboard provides a comprehensive platform to monitor and manage your finances effortlessly. With features tailored to your financial needs, this dashboard empowers you to track expenses, record income, and gain insights into your financial health. Seamlessly navigate through various sections such as E-transactions, Expense Form, and Income Form to input and manage your financial data conveniently. Whether you're budgeting for personal expenses or managing finances for your business, this dashboard offers intuitive tools to streamline your financial management process. Stay organized, informed, and in control of your finances with the Money Tracker Dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Aboutwebsite;