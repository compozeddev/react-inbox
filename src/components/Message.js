import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateMessageAction, fetchMessageBodyAction} from '../actions'

const Message = ({id, message, raiseUpdateMessageAction, raiseFetchMessageBodyAction}) => {

    const renderMessageLabels = () => {
        return message.labels.map(
            (aLabel) => (
                <span key={`message-${id}-${aLabel}`}
                      className="label label-warning"> {aLabel} </span>)
        )
    };

    const onMessageClicked = () => {
        console.error('message clicked', message);
        raiseFetchMessageBodyAction(message);
    };

    const onStarClicked = () => {
        const updatedMessage = {
            ...message,
            starred: !message.starred
        };
        const patchRequest = {
            messageIds: [id],
            command: 'star',
            star: updatedMessage.starred
        };

        raiseUpdateMessageAction(updatedMessage, patchRequest);
    };

    const onCheckboxClicked = () => {
        const updatedMessage = {
            ...message,
            selected: !message.selected
        };
        raiseUpdateMessageAction(updatedMessage);
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
                <div onClick={onMessageClicked}>
                    {message.subject}
                </div>

            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => bindActionCreators({raiseUpdateMessageAction: updateMessageAction, raiseFetchMessageBodyAction: fetchMessageBodyAction}, dispatch);

//TODO: do i need withRouter?
export default connect(
    null,
    mapDispatchToProps
)(Message)
