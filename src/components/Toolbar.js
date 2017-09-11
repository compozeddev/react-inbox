import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {composeButtonClicked, bulkMessageUpdate} from '../actions'

const Toolbar = (messages, shouldShowComposeForm) => {
    const countUnreadMessages = () => {
        console.log('Toolbar messages:', messages)
        return messages.filter(aMessage => aMessage.read === false).length;
    };

    const composeButtonClicked = () => {
        composeButtonClicked(!shouldShowComposeForm)
    };

    const selectAllClicked = () => {
        if (allMessagesAlreadySelected()) {
            setAllMessagesIsSelectedTo(false);
        } else {
            setAllMessagesIsSelectedTo(true);
        }
    };

    const markAllSelectedAsReadClicked = () => {
        changeSelectedIsReadStatus(true);
    };

    const markAllSelectedAsUnreadClicked = () => {
        changeSelectedIsReadStatus(false);
    };

    const changeSelectedIsReadStatus = (isRead) => {
        const patchRequest = {
            messageIds: [],
            command: 'read',
            read: isRead
        };

        const updatedMessages = messages.map((aMessage) => {
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

        bulkMessageUpdate(updatedMessages, patchRequest);
    };

    const deleteSelectedMessagesClicked = () => {
        let deleted = [];
        let notDeleted = [];
        const patchRequest = {
            messageIds: [],
            command: 'delete',
            delete: true
        };

        messages.map((aMessage) => {
            if (aMessage.selected) {
                patchRequest.messageIds.push(aMessage.id);
                deleted.push(aMessage)
            }
            else {
                notDeleted.push(aMessage)
            }
        });

        bulkMessageUpdate(notDeleted, patchRequest);
    };

    const onApplyLabel = (e) => {
        let patchRequest = {
            messageIds: [], command: 'addLabel', label: e.target.value
        };

        const updatedMessages = messages.map((aMessage) => {
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

        bulkMessageUpdate(updatedMessages, patchRequest);
    };

    const onRemoveLabel = (e) => {
        let patchRequest = {
            messageIds: [], command: 'removeLabel', label: e.target.value
        };

        const updatedMessages = messages.map((aMessage) => {
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
        bulkMessageUpdate(updatedMessages, patchRequest);
    };

    const classNameForSelectAll = () => {
        if (allMessagesAlreadySelected()) {
            return "fa fa-check-square-o";
        }

        if (someMessagesAlreadySelected()) {
            return "fa fa-minus-square-o";
        } else {
            return "fa fa-square-o";
        }
    };

    const allMessagesAlreadySelected = () => {
        return messages.length === messages.filter(aMessage => aMessage.selected === true).length
    };

    const someMessagesAlreadySelected = () => {
        return messages.filter(aMessage => aMessage.selected === true).length > 0;
    };

    const setAllMessagesIsSelectedTo = (isSelected) => {
        const updatedMessages = messages.map((aMessage) => {
            return {
                ...aMessage,
                selected: isSelected
            };
        });

        bulkMessageUpdate(updatedMessages);
    };

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{countUnreadMessages()}</span>
                    {`unread message${countUnreadMessages() === 1 ? "" : "s"}`}
                </p>

                <a className="btn btn-danger" onClick={composeButtonClicked}>
                    <i className="fa fa-plus"></i>
                </a>

                <button className="btn btn-default" onClick={selectAllClicked}>
                    <i className={classNameForSelectAll()}></i>
                </button>

                <button className="btn btn-default" disabled={someMessagesAlreadySelected() ? "" : "disabled"}
                        onClick={markAllSelectedAsReadClicked}>
                    Mark As Read
                </button>

                <button className="btn btn-default" disabled={someMessagesAlreadySelected() ? "" : "disabled"}
                        onClick={markAllSelectedAsUnreadClicked}>
                    Mark As Unread
                </button>

                <select className="form-control label-select"
                        disabled={someMessagesAlreadySelected() ? "" : "disabled"}
                        onChange={onApplyLabel}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select"
                        disabled={someMessagesAlreadySelected() ? "" : "disabled"}
                        onChange={onRemoveLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" onClick={deleteSelectedMessagesClicked}
                        disabled={someMessagesAlreadySelected() ? "" : "disabled"}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            composeButtonClicked: bindActionCreators(composeButtonClicked, dispatch),
            bulkMessageUpdate: bindActionCreators(bulkMessageUpdate, dispatch),
        }
    }
};

const mapStateToProps = (state) => {
    return (
        {
            shouldShowComposeForm: state.shouldShowComposeForm,
            messages: state.messages
        }
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

