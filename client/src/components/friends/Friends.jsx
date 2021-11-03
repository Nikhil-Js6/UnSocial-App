import React from 'react';

function Friends({ data }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <li className="sidebarFriend">
                <img src={ PF + data.profilePicture } alt="img"/>
                <span className="sidebarFriendName">{data.username}</span>
            </li>
        </div>
    )
}

export default Friends;