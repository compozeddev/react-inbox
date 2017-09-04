import React from 'react';

class ComposeMessage extends React.Component {

    constructor(props) {
        //receives props addMessageCallback, shouldShow
        super(props);
        this.state = {
            messageSubject: '',
            messageBody: ''
        }
    }

    render() {
        if (!this.props.shouldShow) {
            return <div></div>
        }

        return (
            <form className="form-horizontal well" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="subject" placeholder="Enter a subject"
                               name="subject" onBlur={this.onSubjectChanged}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea name="body" id="body" className="form-control" onBlur={this.onBodyChanged}></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" className="btn btn-primary"/>
                    </div>
                </div>
            </form>

        )
    }

    onSubjectChanged = (e) => {
        this.setState({messageSubject: e.target.value})
    };

    onBodyChanged = (e) => {
        this.setState({messageBody: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
        let newMessage = {
            subject: this.state.messageSubject,
            body: this.state.messageBody,
        };
        this.props.newMessageCallback(newMessage);
    };
}
export default ComposeMessage;
