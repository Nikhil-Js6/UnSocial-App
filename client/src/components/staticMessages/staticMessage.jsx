import './message.css';
import { format } from "timeago.js";
import { useRef } from 'react';

export default function StaticMessage({ user, message, own }) {
    return (
    <div>
        <div className={own ? 'own message' : 'message'}>
            <div className='messageTop'>
                <img className='messageImg' src={user?.profilePicture ? user.profilePicture : "https://media.istockphoto.com/vectors/cute-smiling-robot-chat-bot-say-hivector-modern-flat-cartoon-voice-vector-id1073076312?k=20&m=1073076312&s=612x612&w=0&h=NeTBw29_WhJSZpcS6kPLGN9cmjxKbr9XtUboCZZ4nhQ="} alt="senderImg"/>
                <p className='messageBody'>{`Hello ${user.username} ,How are you doing?
                  This feature is in progress and will came soon.Our developers are working on it.`}
                </p>
            </div>
            <div className='messageBottom'>{`${new Date().getHours()}:${new Date().getMinutes()}`}</div>
        </div>
        <div className={own ? 'own message' : 'message'}>
            <div className='messageTop'>
                <img className='messageImg' src={user?.profilePicture ? user.profilePicture : "https://media.istockphoto.com/vectors/cute-smiling-robot-chat-bot-say-hivector-modern-flat-cartoon-voice-vector-id1073076312?k=20&m=1073076312&s=612x612&w=0&h=NeTBw29_WhJSZpcS6kPLGN9cmjxKbr9XtUboCZZ4nhQ="} alt="senderImg"/>
                <p className='messageBody'>BTW I'm chatbot nice to meet you,
                till then you can chat with me.I'm really made for this.
                </p>
            </div>
            <div className='messageBottom'>{`${new Date().getHours()}:${new Date().getMinutes()}`}</div>
        </div>
    </div>
    )
}
//`${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes() < 10 ? "0" + new Date(message.createdAt).getMinutes() : new Date(message.createdAt).getMinutes()}`