import { useState, useEffect, useContext } from 'react';
import "./feed.css";
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

function Feed({ username }) {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
              ? await axios.get('/posts/profile/' + username)   // for profile page
              : await axios.get('/posts/timeline/' + user._id);  // for home page
            setPosts(res.data.sort((p1, p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }
        fetchPosts();
    }, [username, user]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                { (!username || username === user?.username) && <Share /> }
                {
                  posts.map((post) => (
                     <Post post={post} key={post._id} />
                  ))
                }
            </div>
        </div>
    )
}

export default Feed;
