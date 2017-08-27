import React, {Component} from 'react';

class Toolbar extends Component {
    //receives messages and bulkMessageChangeCallback in props
    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.countUnreadMessages()}</span>
                        unread messages
                    </p>

                    <button className="btn btn-default" onClick={this.selectAllClicked}>
                        <i className={this.classNameForSelectAll()}></i>
                    </button>

                    <button className="btn btn-default">
                        Mark As Read
                    </button>

                    <button className="btn btn-default">
                        Mark As Unread
                    </button>

                    <select className="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }

    countUnreadMessages = () => {
        return this.props.messages.filter(aMessage => aMessage.read === false).length;
    };

    selectAllClicked = () => {
        if (this.allMessagesAlreadySelected()) {
            this.unSelectAllMessages();
        } else {
            this.selectAllMessages();
        }
    };

    classNameForSelectAll = () => {
        if (this.allMessagesAlreadySelected()) {
            return "fa fa-check-square-o";
        }

        if (this.someMessagesAlreadySelected()) {
            return "fa fa-minus-square-o";
        } else {
            return "fa fa-square-o";
        }
    };
    allMessagesAlreadySelected = () => {
        return this.props.messages.length === this.props.messages.filter(aMessage => aMessage.selected === true).length
    };

    someMessagesAlreadySelected = () => {
        return this.props.messages.filter(aMessage => aMessage.selected === true).length > 0;
    };

    unSelectAllMessages = () => {
        const updatedMessages = this.props.messages.map((aMessage) => {
            const updatedMessage = {
                ...aMessage,
                selected: false
            };
            return updatedMessage
        });
        this.props.bulkMessageChangeCallback(updatedMessages);
    };

    selectAllMessages = () => {
        const updatedMessages = this.props.messages.map((aMessage) => {
            const updatedMessage = {
                ...aMessage,
                selected: true
            };
            return updatedMessage
        });
        this.props.bulkMessageChangeCallback(updatedMessages);
    };
}
export default Toolbar;

