import React, {Component} from 'react';


class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: props.message
        };
    };

    render() {
        return (
            <div
                className={`row message ${(this.state.message.read) ? "read" : "unread"} ${(this.state.message.selected) ? "selected" : "" }`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={this.state.message.selected}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa ${(this.state.message.starred) ? "fa-star" : "fa-star-o"}`}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {this.renderMessageLabels()}
                    <a href="#">
                        {this.state.message.subject}
                    </a>
                </div>
            </div>
        )
    }

    renderMessageLabels = () => {
        return this.state.message.labels.map(
            (aLabel) => (
                <span key={`message-${this.state.message.id}-${aLabel}`} className="label label-warning"> {aLabel} </span>)
        )
    };

}

export default Message;


