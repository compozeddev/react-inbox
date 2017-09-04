import React from 'react';

class Message extends React.Component {
    // receives a message and messageChangedCallback in props

    shouldComponentUpdate(nextProps) {
        return !(nextProps.message.id === this.props.message.id
            && nextProps.message.subject === this.props.message.subject
            && nextProps.message.read === this.props.message.read
            && nextProps.message.starred === this.props.message.starred
            && nextProps.message.selected === this.props.message.selected
            && nextProps.message.labels.length === this.props.message.labels.length
        )
    }

    render() {
        return (
            <div
                className={`row message ${(this.props.message.read) ? "read" : "unread"} ${(this.props.message.selected) ? "selected" : "" }`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={!!this.props.message.selected}
                                   onChange={this.onCheckboxClicked}/>
                        </div>
                        <div className="col-xs-2" onClick={this.onStarClicked}>
                            <i className={`star fa ${(this.props.message.starred) ? "fa-star" : "fa-star-o"}`}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {this.renderMessageLabels()}
                    <a href="#">
                        {this.props.message.subject}
                    </a>
                </div>
            </div>
        )
    }

    renderMessageLabels = () => {
        return this.props.message.labels.map(
            (aLabel) => (
                <span key={`message-${this.props.message.id}-${aLabel}`}
                      className="label label-warning"> {aLabel} </span>)
        )
    };

    onStarClicked = () => {
        const updatedMessage = {
            ...this.props.message,
            starred: !this.props.message.starred
        };
        const patchRequest = {
            messageIds: [this.props.message.id],
            command: 'star',
            star: updatedMessage.starred
        };

        this.props.messageChangedCallback(updatedMessage, patchRequest);
    };

    onCheckboxClicked = () => {
        const updatedMessage = {
            ...this.props.message,
            selected: !this.props.message.selected
        };
        this.props.messageChangedCallback(updatedMessage);
    };
}
export default Message;


