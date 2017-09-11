import React from 'react';
import Message from './Message';
import {connect} from 'react-redux'

const Messages = ({messages}) => (
    <div>
        { messages.map(message => <Message key={ message.id } message={ message }/>) }
    </div>
);

const mapStateToProps = state => ({messages: state.messages});
export default connect(
    mapStateToProps,
    null
)(Messages)