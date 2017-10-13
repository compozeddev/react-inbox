export const MESSAGE_CREATED = 'MESSAGE_CREATED';
export const MESSAGE_UPDATED = 'MESSAGE_UPDATED';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGE_BODY_RECEIVED = 'MESSAGE_BODY_RECEIVED';
export const BULK_MESSAGE_UPDATE = 'BULK_MESSAGE_UPDATE';

export const fetchMessagesAction = () => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages`);
        const json = await response.json();
        const action =
            {
                type: MESSAGES_RECEIVED,
                messages: json._embedded.messages
            };
        dispatch(action)
    }
};
export const fetchMessageBodyAction = (message) => {
    console.error('fetchMessageBody', message)
    return async (dispatch) => {
        const response = await fetch(`/api/messages/${message.id}`);
        console.error('after response')
        const json = await response.json();
        console.error('json', json)
        const action =
            {
                type: MESSAGE_BODY_RECEIVED,
                messageId: message.id,
                message: { ...message,
                body: json.body}
            };
        dispatch(action)
    }
};

export const createMessageAction = (newMessage, history) => {
    return async (dispatch) => {
        const response = await fetch(`/api/messages`, {
            method: 'POST',
            body: JSON.stringify(newMessage),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const postedMessage = await response.json();
        const action = {
            type: MESSAGE_CREATED,
            message: postedMessage
        };
        dispatch(action);
        history.push('/');
    }
};

export const updateMessageAction = (updatedMessage, patchRequest) => {
    return async (dispatch) => {
        if (patchRequest) {
            await fetch(`/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify(patchRequest),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        }
        const action = {
            type: MESSAGE_UPDATED,
            message: updatedMessage
        };
        dispatch(action)
    }
};


export const bulkMessageUpdateAction = (updatedMessages, patchRequest) => {
    return async (dispatch) => {
        if (patchRequest) {
            await fetch(`/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify(patchRequest),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        }
        const action = {
            type: BULK_MESSAGE_UPDATE,
            messages: updatedMessages
        };
        dispatch(action)
    }
};