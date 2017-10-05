import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateMessageAction} from '../actions'

const Message = ({message, updateMessageAction}) => {

    //TODO: can you run shouldComponentUpdate from a pure function?
    //TODO: Do we really need to mapStateToProps if messages are passed in?
    // const shouldComponentUpdate(nextProps)
    // {
    //     return !(nextProps.message.id === message.id
    //         && nextProps.message.subject === message.subject
    //         && nextProps.message.read === message.read
    //         && nextProps.message.starred === message.starred
    //         && nextProps.message.selected === message.selected
    //         && nextProps.message.labels.length === message.labels.length
    //     )
    // };

    const renderMessageLabels = () => {
        return message.labels.map(
            (aLabel) => (
                <span key={`message-${message.id}-${aLabel}`}
                      className="label label-warning"> {aLabel} </span>)
        )
    };

    const onStarClicked = () => {
        const updatedMessage = {
            ...message,
            starred: !message.starred
        };
        const patchRequest = {
            messageIds: [message.id],
            command: 'star',
            star: updatedMessage.starred
        };

        updateMessageAction(updatedMessage, patchRequest);
    };

    const onCheckboxClicked = () => {
        const updatedMessage = {
            ...message,
            selected: !message.selected
        };
        updateMessageAction(updatedMessage);
    };

    return (
        <div
            className={`row message ${(message.read) ? "read" : "unread"} ${(message.selected) ? "selected" : "" }`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" checked={!!message.selected}
                               onChange={onCheckboxClicked}/>
                    </div>
                    <div className="col-xs-2" onClick={onStarClicked}>
                        <i className={`star fa ${(message.starred) ? "fa-star" : "fa-star-o"}`}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {renderMessageLabels()}
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => bindActionCreators({updateMessageAction: updateMessageAction}, dispatch);

//TODO: do i need withRouter?
export default connect(
    null,
    mapDispatchToProps
)(Message)
