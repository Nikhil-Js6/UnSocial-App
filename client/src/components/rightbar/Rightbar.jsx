import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState, dispatch } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Close, Remove } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";

function Rightbar({ user }) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ad, setAd] = useState(true);
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?._id));

    useEffect(() => {
      const getFriends = async () => {
          try {
            const friendList = await axios.get("/users/friends/" + user._id);
            setFriends(friendList.data);
          }catch(err) {
            console.log(err);
          }
      };
      getFriends();
    }, [user?._id]);

    const handleFollow = async () => {
        try {
            if(!followed) {
                await axios.put("/users/" + user._id + "/follow" ,
                  { userId: currentUser?._id }
                );
                dispatch({ type: "FOLLOW", payload: user._id});
            }
            else{
                await axios.put("/users/" + user._id + "/unfollow",
                  { userId: currentUser?._id }
                );
                dispatch({ type: "UNFOLLOW", payload: user._id});
            }
            setFollowed(!followed);
        }catch(err) {
            console.log(err); 
        }
    }

    const handleAd = async () => {
        setAd(!ad);
    };

  const HomeRightbar = () => {
    return (
      <>
        <div className="bdayContainer">
          <img className="bdayImg" src="assets/gift.png" alt="" />
          <span className="bdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        {
          ad
          ? <div className="adDiv">
              <h4>Sponsored:</h4>
              <img className="adImage" src="assets/ad.png" alt="" />
              <Close className="close" onClick={handleAd}/>
            </div>

          : <div className="nonad">
                <h4>Sponsored:</h4>
                <div className="adremoveContent">
                    <h4>Ad removed</h4>
                    <span className="nonadbottom">
                      <p onClick={handleAd}>Undo</p>
                      <p>Tell us Why?</p>
                    </span>
                </div>
             </div>
         }

        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
             <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      { currentUser?.username !== user.username &&
          <button className="profileFollowButton" onClick={handleFollow}>
              {followed
                ? <div followWrapper onClick={() => setFollowed(!followed)}>Unfollow <Remove /></div>
                : <div followWrapper onClick={() => setFollowed(!followed)}>Follow <Add /></div>
              }
          </button>
      }
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
               {
                user.relationship === 1
                  ? "Single"
                  : user.relationship === 2
                  ? "Married"
                  : "-"
                }
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {
          friends.map((friend) => (
             <Link to={`/profile/${friend.username}`} style={{textDecoration: 'none'}}>
                <div className="rightbarFollowing">
                  <img
                      src={!friend.profilePicture
                        ? `${PF}person/noAvatar.png`
                        : `${PF}friend.profilePicture`
                      }
                      alt=""
                      className="rightbarFollowingImg"
                      />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
             </Link>
          ))  
        }
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
