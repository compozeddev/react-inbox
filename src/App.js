import React, {Component}from 'react';
import Messages from './components/Messages';
import Toolbar from './components/Toolbar';
import './App.css';
import ComposeMessage from "./components/ComposeMessage";
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';


class App extends Component {

    render() {
        return (
            (this.props.messages) ?
                (
                    <div>
                        <Toolbar messages={this.props.messages}/>
                        <Route path="/compose" component={ ComposeMessage }/>
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
        messages: newState.messages.all
    };
    return newProps;
};

export default withRouter(connect(mapStateToProps, null)(App));
