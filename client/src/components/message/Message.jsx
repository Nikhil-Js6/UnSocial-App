import './message.css';
import { format } from "timeago.js";
import { useRef } from 'react';

export default function Message({ user, message, own }) {
    return (
        <div className={own ? 'own message' : 'message'}>
            <div className='messageTop'>
                <img className='messageImg' src={user?.profilePicture ? user.profilePicture : "https://www.imagesjunction.com/images/img/beautiful_girls_dp_wallpapers.jpg"} alt="senderImg"/>
                <p className='messageBody'>{message.text}</p>
            </div>
            <div className='messageBottom'>{format(message.createdAt)}</div>
        </div>
    )
}
//`${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes() < 10 ? "0" + new Date(message.createdAt).getMinutes() : new Date(message.createdAt).getMinutes()}`