export const COMPOSE_BUTTON_CLICKED = 'COMPOSE_BUTTON_CLICKED';
export const composeButtonClicked = (shouldShowComposeForm) => {
    return (dispatch) => {
        const dispatchMessage ={
            type: COMPOSE_BUTTON_CLICKED,
            shouldShowComposeForm: shouldShowComposeForm
        };
        console.log('actions/index.js - dispatching: ', dispatchMessage)
        dispatch(dispatchMessage)
    }
};

export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const fetchMessages = () => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages`);
        const json = await response.json();
        const dispatchMessage =
            {
                type: MESSAGES_RECEIVED,
                messages: json._embedded.messages
            };
        console.log('actions/index.js - dispatching: ', dispatchMessage.messages)
        dispatch(dispatchMessage)
    }
};

export const MESSAGE_CREATED = 'MESSAGE_CREATED';
export const createMessage = (newMessage) => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages`, {
            method: 'POST',
            body: JSON.stringify(newMessage),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("response", response);

        const postedMessage = await response.json();
        const dispatchMessage = {
            type: MESSAGE_CREATED,
            message: postedMessage
        }
        console.log('actions/index.js - dispatching: ', dispatchMessage)
        dispatch(dispatchMessage)
    }
};

export const MESSAGE_UPDATED = 'MESSAGE_UPDATED';
export const updateMessage = (updatedMessage, patchRequest) => {
    return async (dispatch) => {
        console.log("patchRequestJSON", JSON.stringify(patchRequest));
        if (patchRequest) {
            const response = await fetch(`/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify(patchRequest),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log("response", response);
        }
        const dispatchMessage = {
            type: MESSAGE_UPDATED,
            message: updatedMessage
        }
        console.log('actions/index.js - dispatching: ', dispatchMessage)
        dispatch(dispatchMessage)
    }
};

export const BULK_MESSAGE_UPDATE = 'BULK_MESSAGE_UPDATE';
export const bulkMessageUpdate = (updatedMessages, patchRequest) => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify(patchRequest),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("response", response);
        const dispatchMessage = {
            type: BULK_MESSAGE_UPDATE,
            messages: updatedMessages
        };
        console.log('actions/index.js - dispatching: ', dispatchMessage)
        dispatch(dispatchMessage)
    }
};