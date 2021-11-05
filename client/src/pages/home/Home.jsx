import React from 'react';
import './home.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

function Home() {
    return (
        <div>
            <Topbar />
            <div className="home">
                <Sidebar />
                <Feed />
                <Rightbar/>
            </div>
        </div>
    )
}

export default Home;
