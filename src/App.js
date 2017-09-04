import React, {Component} from 'react';
import Messages from './components/Messages';
import Toolbar from './components/Toolbar';
import './App.css';

const seedData = [
    {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": [
            "dev",
            "personal"
        ]
    },
    {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
    },
    {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": [
            "dev"
        ]
    },
    {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
    },
    {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": [
            "personal"
        ]
    },
    {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
    },
    {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": [
            "dev",
            "personal"
        ]
    },
    {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
    }
];

class App extends Component {

    constructor() {
        super();
        this.state = {
            messages: []
        }
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
        console.log("response", response)
    }
}
export default App;