import { Check, DoneAll } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './conversation.css';

export default function Conversation({ conversations, currentUser }) {

    const [user, setUser] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=> {
        const friendId = conversations.members.find((memberId) => memberId !== currentUser._id);
        const getUser = async() => {
            try {
                const res = await axios.get("/users?userId=" + friendId);
                setUser(res.data);
            }catch(err) {
                console.log(err);   
            }
        }
        getUser();
    }, [conversations, currentUser]);

    return (
        <div className='conversation'>
        <img className='chatUserImg' src={user?.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt=""/>
             <span>
                <p className='chatUsername'>{user?.username}</p>
                <span className='chatUserMessage' style={{color: 'lightgreen'}}>Typing...</span>
                <Check className='chatViewIcon' />
             </span>
        </div>
    )
}
