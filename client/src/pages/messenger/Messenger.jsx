import { useState, useEffect, useContext, useRef } from 'react';
import './messenger.css';
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { io } from 'socket.io-client';
import StaticConversation from '../../components/conversationStatic/staticConversation';
import StaticMessage from '../../components/staticMessages/staticMessage';

export default function Messenger() {

    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        setSocket(io("ws://localhost:4400"));
    }, []);

    useEffect(() => {
        socket?.on("welcome", (message) => {
            console.log(message);
        })
    }, [socket]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/"+ user._id);
                setConversations(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        getConversations();
    }, [user?._id]);

    useEffect(() => {
        const getMessages = async() => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat]);

    async function sendMessage(e) {
        e.preventDefault();
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage,
        }
        try {
            const res = await axios.post("/messages/", message);
            res && setMessages([...messages, res.data]);
            setNewMessage("");
        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input className='chatInput' placeholder="Search for friends..."/>
                        {
                        conversations?.map((conv) => (
                            <div onClick={() => setCurrentChat(conv)}>
                            <Conversation conversations={conv} key={conv._id} currentUser={user}/>
                            </div>
                        ))
                        }
//                         <div onClick={() => setCurrentChat(true)}>
//                             <StaticConversation/>
//                         </div>
                        
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                    { currentChat
                        ? (<>
//                             <StaticMessage user={user}/>
                            <div className='chatBoxTop'>
                            {
                              messages?.map((m) => (
                                <div ref={scrollRef}>
                                    <Message message={m} key={m._id} user={user} own={m.sender === user._id}/>
                                </div>
                              ))
                            } 
                            </div>
                            <div className='chatBoxBottom'>
                                <textarea
                                    className='messageSendInput'
                                    placeholder='Write a message...'
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                >
                                </textarea>
                                <button className='messageSendButton' onClick={newMessage !== null && newMessage !=="  " && sendMessage}>Send</button>
                            </div>
                          </>)
                        : (
                            <span className='noConversationText'>Open a conversation to start a chat.</span>
                    )}
                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}
