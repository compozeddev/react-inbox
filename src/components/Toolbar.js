import React, {Component} from 'react';

class Toolbar extends Component {
    //receives messages and bulkMessageChangeCallback in props
    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.countUnreadMessages()}</span>
                        {`unread message${this.countUnreadMessages() === 1 ? "" : "s"}`}
                    </p>

                    <button className="btn btn-default" onClick={this.selectAllClicked}>
                        <i className={this.classNameForSelectAll()}></i>
                    </button>

                    <button className="btn btn-default" disabled={this.someMessagesAlreadySelected() ? "" : "disabled"}
                            onClick={this.markAllSelectedAsReadClicked}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" disabled={this.someMessagesAlreadySelected() ? "" : "disabled"}
                            onClick={this.markAllSelectedAsUnreadClicked}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select"
                            disabled={this.someMessagesAlreadySelected() ? "" : "disabled"}
                            onChange={this.onApplyLabel}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select"
                            disabled={this.someMessagesAlreadySelected() ? "" : "disabled"}
                            onChange={this.onRemoveLabel}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={this.deleteSelectedMessagesClicked}
                            disabled={this.someMessagesAlreadySelected() ? "" : "disabled"}>
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
            this.setAllMessagesIsSelectedTo(false);
        } else {
            this.setAllMessagesIsSelectedTo(true);
        }
    };

    markAllSelectedAsReadClicked = () => {
        this.changeSelectedIsReadStatus(true);
    };

    markAllSelectedAsUnreadClicked = () => {
        this.changeSelectedIsReadStatus(false);
    };

    changeSelectedIsReadStatus = (isRead) => {
        const patchRequest = {
            messageIds: [],
            command: 'read',
            read: isRead
        };

        const updatedMessages = this.props.messages.map((aMessage) => {
            if (aMessage.selected) {
                patchRequest.messageIds.push(aMessage.id);
                return {
                    ...aMessage,
                    read: isRead
                }
            }
            else {
                return aMessage
            }
        });

        this.props.bulkMessageChangeCallback(updatedMessages, patchRequest);
    };

    deleteSelectedMessagesClicked = () => {
        let deleted = [];
        let notDeleted = [];
        const patchRequest = {
            messageIds: [],
            command: 'delete',
            delete: true
        };

        this.props.messages.map((aMessage) =>{
            if (aMessage.selected){
                patchRequest.messageIds.push(aMessage.id);
                deleted.push(aMessage)
            }
            else {
                notDeleted.push(aMessage)
            }
        });

        this.props.bulkMessageChangeCallback(notDeleted, patchRequest);
    };

    onApplyLabel = (e) => {
        let patchRequest = {
            messageIds: [], command: 'addLabel', label: e.target.value
        };

        const updatedMessages = this.props.messages.map((aMessage) => {
            if (!aMessage.selected || aMessage.labels.find(aLabel => aLabel === e.target.value)) {
                return aMessage
            } else {
                patchRequest.messageIds.push(aMessage.id);
                return {
                    ...aMessage,
                    labels: [...aMessage.labels, (e.target.value)]
                };
            }
        });

        this.props.bulkMessageChangeCallback(updatedMessages, patchRequest);
    };

    onRemoveLabel = (e) => {
        let patchRequest = {
            messageIds: [], command: 'removeLabel', label: e.target.value
        };

        const updatedMessages = this.props.messages.map((aMessage) => {
            if (!aMessage.selected || !aMessage.labels.find(aLabel => aLabel === e.target.value)) {
                return aMessage
            } else {
                patchRequest.messageIds.push(aMessage.id);
                return {
                    ...aMessage,
                    labels: aMessage.labels.filter(aLabel => aLabel !== e.target.value)
                };
            }
        });
        this.props.bulkMessageChangeCallback(updatedMessages, patchRequest);
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

    setAllMessagesIsSelectedTo = (isSelected) => {
        const updatedMessages = this.props.messages.map((aMessage) => {
            return {
                ...aMessage,
                selected: isSelected
            };
        });

        this.props.bulkMessageChangeCallback(updatedMessages);
    };
}

export default Toolbar;

