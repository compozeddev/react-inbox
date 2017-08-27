import React from 'react';
import Message from './Message'

const Messages = ({messages, messageChangedCallback}) => (
    <div className="container">
        { messages.map(message => <Message key={ message.id } message={ message } messageChangedCallback={messageChangedCallback}/>) }
    </div>
);
export default Messages;