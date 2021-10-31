import "./topbar.css";
import { useContext } from "react";
import { GroupWork, Search, Person, Chat, Notifications, ArrowDropDown } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";

function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    return (
        <div className="topbarContainer">

            <div className="left">
                <GroupWork className="logoIcon"/>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="logo">UnSocial</span>
                </Link>
            </div>

            <div className="center">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input
                       placeholder="Search for friends, posts or images"
                       className="search input"
                    />
                </div>
            </div>

            <div className="right">
                <div>
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="iconBadge">1</span>
                    </div>
                </div>
                <Link to={`profile/${user?.username}`}>
                    <div className="profilePic">
                        <img src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="profile"/>
                        <span className="profileDropdown">
                            <ArrowDropDown htmlColor="white"/>
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
