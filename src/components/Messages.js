import React from "react";
import Message from "./Message";
import {withRouter} from 'react-router-dom';


const Messages = ({messages}) => (
    <div>
        { messages.map(message => <Message key={ message.id } message={ message }/>) }
    </div>
);

export default withRouter(Messages);