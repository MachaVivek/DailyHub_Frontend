import React from "react";
import { Route, Routes} from "react-router-dom";


import Home from "./components/home";
import Loginpage from "./components/loginpage";
import Registerpage from "./components/registerpage";
import Aboutus from "./components/aboutus";
import Navvbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Aboutwebsite from "./components/aboutwebsite";

import Game2048 from "./games_components/game"

import Join from "./chats_components/join";
import Chat from "./chats_components/chat"

import MoneytrackerDashboard from "./dashboards_all/moneytracker_dashbaord"
import DairyDashboard from "./dashboards_all/dairy_dashboard"
import StoryDashboard from "./dashboards_all/story_dashboard"
import NewsDashboard from "./dashboards_all/news_dashboard"
import Adminpage from "./admin_components/adminpage";

function App() {
  return (
    <>
    <Navvbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/dashboard/" element={<Dashboard/>} />
    <Route path="/loginpage" element={<Loginpage/>}/>
    <Route path="/registerpage" element={<Registerpage/>}/>
    <Route path="/aboutus" element={<Aboutus/>}/>
    <Route path="/aboutwebsite" element={<Aboutwebsite/>}/>

    <Route path="/game2048" element={<Game2048/>}/>
    <Route path="/join" element={<Join/>}/>
    <Route path="/chat" element={<Chat/>}/>
  
    <Route path="/moneytrackerdashboard/*" element={<MoneytrackerDashboard/>}/>
    <Route path="/dairydashboard/*" element={<DairyDashboard/>}/>
    <Route path="/storydashboard/*" element={<StoryDashboard/>}/>
    <Route path="/newsdashboard/*" element={<NewsDashboard/>}/>

    <Route path="/adminpage/*" element={<Adminpage/>}/>

    </Routes>
    </>
  );
}
export default App;