import {combineReducers} from 'redux';
import {
    COMPOSE_BUTTON_CLICKED,
    MESSAGES_RECEIVED,
    MESSAGE_CREATED,
    MESSAGE_UPDATED,
    BULK_MESSAGE_UPDATE
} from '../actions';

const messages = (state = {messages: []}, action) => {
    let newState;
    switch (action.type) {

        case MESSAGES_RECEIVED:
            console.log("MESSAGES_RECEIVED reducer - action.messages", action.messages)
            newState = {
                ...state,
                messages: action.messages
            };
            console.log("MESSAGES_RECEIVED reducer - newState = ", newState)
            return newState;

        case MESSAGE_CREATED:
            newState = {
                shouldShowComposeForm: state.shouldShowComposeForm,
                messages: [
                    action.message,
                    ...state.messages
                ]
            };
            console.log('MESSAGE_CREATED reducer - newState = ', newState)
            return newState;

        case MESSAGE_UPDATED:
            const updatedMessages = state.map((stateMessage) => {
                    if (stateMessage.id === action.message.id) {
                        return action.messages
                    } else {
                        return stateMessage
                    }
                }
            );
            newState = {
                shouldShowComposeForm: state.shouldShowComposeForm,
                messages: updatedMessages
            };
            console.log("MESSAGE_UPDATED reducer - newState = ", newState)
            return newState;

        case BULK_MESSAGE_UPDATE:
            newState = {
                shouldShowComposeForm: state.shouldShowComposeForm,
                messages: action.messages
            };
            console.log("BULK_MESSAGE_UPDATE reducer - newState = ", newState)
            return newState;

        default:
            return state
    }
};

const shouldShowComposeForm = (state = {shouldShowComposeForm: false}, action) => {
    switch (action.type) {
        case COMPOSE_BUTTON_CLICKED:
            const newState = {
                shouldShowComposeForm: action.shouldShowComposeForm
            };
            console.log("COMPOSE_BUTTON_CLICKED reducer - newState = ", newState)
            return newState;
        default:
            return state
    }
};

export default combineReducers({messages, shouldShowComposeForm})