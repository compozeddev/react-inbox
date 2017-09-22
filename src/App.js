import React, {Component}from 'react';
import Messages from './components/Messages';
import Toolbar from './components/Toolbar';
import './App.css';
import ComposeMessage from "./components/ComposeMessage";
import {connect} from 'react-redux';

class App extends Component {

    render() {
        return (
            (this.props.messages) ?
                (
                    <div>
                        <Toolbar messages={this.props.messages}
                                 shouldShowComposeForm={this.props.shouldShowComposeForm}/>
                        <ComposeMessage/>
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
    let newProps = {
        messages: newState.messages.all,
        shouldShowComposeForm: newState.views.shouldShowComposeForm
    };
    return newProps;
};

export default connect(mapStateToProps, null)(App)
