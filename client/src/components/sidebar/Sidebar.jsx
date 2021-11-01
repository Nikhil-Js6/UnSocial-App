import React from 'react';
import "./sidebar.css";
import { RssFeed, Chat, PlayCircleFilled, Group, Bookmarks, HelpOutline, Work, Event, School, } from "@mui/icons-material";
import { Users } from "../../dummyData";
import Friends from '../friends/Friends';

function Sidebar() {
    const Year = new Date().getFullYear();
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilled className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups </span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmarks className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bookmarks </span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions </span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs </span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events </span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">Courses </span>
                    </li>
                </ul>
                <button className="sidebarButton" type="button"> Show More </button>
                <hr />
                <ul className="sidebarFriendsList">
                    {
                        Users.map((user)=>(
                            <Friends data={user} key={user.id}/>
                        ))
                    }
                </ul>
            </div>
            <div className="footer">
            <span className="footerText">
                Copyright © {Year} <span className="brand">UnSocial.</span> <br />
                All Rights Reserved.
            </span>
        </div>
        </div>
    )
}

export default Sidebar;
