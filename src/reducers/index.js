import {combineReducers} from 'redux';
import {
    COMPOSE_BUTTON_CLICKED,
    MESSAGES_RECEIVED,
    MESSAGE_CREATED,
    MESSAGE_UPDATED,
    BULK_MESSAGE_UPDATE
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
            const updatedMessages = state.all.map((stateMessage) => {
                    if (stateMessage.id === action.message.id) {
                        return action.message
                    } else {
                        return stateMessage
                    }
                }
            );
            newState = {
                all: updatedMessages
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

const views = (state = {shouldShowComposeForm: false}, action) => {
    switch (action.type) {
        case COMPOSE_BUTTON_CLICKED:
            const newState = {
                shouldShowComposeForm: action.shouldShowComposeForm
            };
            return newState;
        default:
            return state
    }
};

export default combineReducers({messages, views})