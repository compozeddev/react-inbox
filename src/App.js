import React, {Component}from 'react';
import Messages from './components/Messages';
import Toolbar from './components/Toolbar';
import './App.css';
import ComposeMessage from "./components/ComposeMessage";
import {connect} from 'react-redux';

class App extends Component {

    render() {
        console.log('App.js - messages ======> ', this.props.messages)
        console.log('App.js - messages.length ======> ', this.props.messages.length)
        return (
            (this.props.messages && this.props.messages.length) ?
                (
                    <div>
                        <Toolbar messages={this.props.messages}
                                 shouldShowComposeForm={this.props.shouldShowComposeForm}/>
                        <ComposeMessage shouldShow={this.props.shouldShowComposeForm}/>
                        <Messages messages={this.props.messages}/>
                    </div>
                ) :
                (
                    <div>Loading...</div>
                )

        );
    };
}
const mapStateToProps = (newState) => {
    console.log('App.js - mapStateToProps newState', newState);

    let newProps = {
        messages: newState.messages,
        shouldShowComposeForm: newState.shouldShowComposeForm
    };

    console.log('App.js - mapStateToProps newProps', newProps)
    return newProps;
};


export default connect(mapStateToProps, null)(App)
