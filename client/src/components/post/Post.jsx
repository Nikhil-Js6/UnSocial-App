import { useState, useEffect, useContext } from 'react';
import "./post.css";
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';


function Post({ post }) {

    const comment = Math.floor(Math.random() * 43);
    const[likes, setLikes] = useState(post.likes.length);
    const[isLiked, setIsLiked] = useState(false);
    const[user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const handleLikes = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id});
        }catch(err) {
            console.log(err);
        }
        isLiked ? setLikes(likes-1) : setLikes(likes+1);
        setIsLiked(!isLiked);
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} className="postTopLeft" style={{textDecoration:'none', color:'inherit'}}>
                            <img className="postProfileImage" src={ user.profilePicture || `${PF}person/noAvatar.png`} alt=""/>
                            <span className="postUsername">{ currentUser._id === post.userId ? "You" : user.username }</span>
                            <span className="postTime">{format(post.createdAt)}</span>
                        </Link>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className="postOptions"/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImage" src={PF + post?.img} alt="post-img"/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src="/assets/like.png" className="bottomLikeIcon" onClick = { handleLikes } alt=""/>
                        <img src="/assets/heart.png" className="bottomHeartIcon" onClick = { handleLikes } alt=""/>
                        <span className="postLikeCount">{likes} People liked it.</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postComment">{comment > 1 ? `${comment} comments` : `${comment} comment`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;
