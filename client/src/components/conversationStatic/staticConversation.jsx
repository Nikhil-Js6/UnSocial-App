import { Check, DoneAll, DoneAllOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './conversation.css';

export default function StaticConversation() {

    return (
        <div className='conversation'>
        <img className='chatUserImg' src="https://media.istockphoto.com/vectors/cute-smiling-robot-chat-bot-say-hivector-modern-flat-cartoon-voice-vector-id1073076312?k=20&m=1073076312&s=612x612&w=0&h=NeTBw29_WhJSZpcS6kPLGN9cmjxKbr9XtUboCZZ4nhQ=" alt=""/>
            <span>
                <p className='chatUsername'>Chatbot</p>
                <span className='chatUserMessage' style={{color: 'lightgreen'}}>Typing...</span>
            </span>
            <DoneAllOutlined className='chatViewIcon' />
        </div>
    )
}
