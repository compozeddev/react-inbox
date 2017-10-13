import {combineReducers} from 'redux';
import {
    MESSAGES_RECEIVED,
    MESSAGE_CREATED,
    MESSAGE_UPDATED,
    BULK_MESSAGE_UPDATE,
    MESSAGE_BODY_RECEIVED
} from '../actions';

const messages = (state = {all: []}, action) => {
    let newState;
    switch (action.type) {

        case MESSAGES_RECEIVED:
            newState = {
                all: action.messages
            };
            return newState;

        case MESSAGE_CREATED:
            newState = {
                all: [
                    ...state.all,
                    action.message
                ]
            };
            return newState;

        case MESSAGE_UPDATED:
            const messagesAfterMessageUpdated = state.all.map((stateMessage) => {
                    if (stateMessage.id === action.message.id) {
                        return action.message
                    } else {
                        return stateMessage
                    }
                }
            );
            newState = {
                all: messagesAfterMessageUpdated
            };
            return newState;

        case MESSAGE_BODY_RECEIVED:
            const messagesAfterMessageBodyReceived = state.all.map((stateMessage) => {
                    if (stateMessage.id === action.messageId) {
                        return action.message
                    } else {
                        return stateMessage
                    }
                }
            );
            newState = {
                all: messagesAfterMessageBodyReceived
            };
            return newState;

        case BULK_MESSAGE_UPDATE:
            newState = {
                all: action.messages
            };
            return newState;

        default:
            return state
    }
};

// const views = (state = {shouldShowComposeForm: false}, action) => {
//     switch (action.type) {
//         case COMPOSE_BUTTON_CLICKED:
//             const newState = {
//                 shouldShowComposeForm: action.shouldShowComposeForm
//             };
//             return newState;
//         default:
//             return state
//     }
// };

export default combineReducers({messages})