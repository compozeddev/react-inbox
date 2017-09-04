import React, {Component} from 'react';
import Messages from './components/Messages';
import Toolbar from './components/Toolbar';
import './App.css';
import ComposeMessage from "./components/ComposeMessage";

class App extends Component {

    constructor() {
        super();
        this.state = {
            messages: []
        };
        this.newMessageCallback = this.newMessageCallback.bind(this);
    }

    async componentDidMount() {
        const response = await fetch(`/api/messages`);
        const json = await response.json();
        this.setState({messages: json._embedded.messages});
    }

    render() {
        return (
            <div>
                <Toolbar messages={this.state.messages} bulkMessageChangeCallback={this.bulkMessageChangeCallback}/>
                <ComposeMessage newMessageCallback={this.newMessageCallback}/>
                <Messages messages={this.state.messages} messageChangedCallback={this.messageChangedCallback}/>
            </div>
        )
    }

    messageChangedCallback = (aMessage, patchRequest) => {
        const updatedMessages = this.state.messages.map((stateMessage) => {
                if (stateMessage.id === aMessage.id) {
                    if (patchRequest) {
                        this.sendPatchRequestToServer(patchRequest);
                    }
                    return aMessage
                } else {
                    return stateMessage
                }
            }
        );
        this.setState({messages: updatedMessages});
    };

    bulkMessageChangeCallback = (updatedMessages, patchRequest) => {
        if (patchRequest) {
            this.sendPatchRequestToServer(patchRequest);
        }
        this.setState({messages: updatedMessages});
    };

    async newMessageCallback(newMessage) {
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
        const newState = {messages: [...this.state.messages, postedMessage]};

        this.setState(newState)
    };

    async sendPatchRequestToServer(patchRequest) {
        console.log("patchRequstJSON", JSON.stringify(patchRequest));
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
}
export default App;