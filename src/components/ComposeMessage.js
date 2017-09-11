import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createMessage} from '../actions';

const ComposeMessage = (shouldShowComposeForm) => {

    const onSubmit = (e) => {
        e.preventDefault();
        let newMessage = {
            subject: this.state.messageSubject,
            body: this.state.messageBody,
        };
        createMessage(newMessage);
    };

    const onSubjectChanged = (e) => {
        this.setState({messageSubject: e.target.value})
    };

    const onBodyChanged = (e) => {
        this.setState({messageBody: e.target.value})
    };

    return (
        shouldShowComposeForm) ?
        (
            <form className="form-horizontal well" onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="subject" placeholder="Enter a subject"
                               name="subject" onBlur={onSubjectChanged}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea name="body" id="body" className="form-control" onBlur={onBodyChanged}></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" className="btn btn-primary"/>
                    </div>
                </div>
            </form>
        ) :
        (
            <div></div>
        )
};


const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({onSubmit: createMessage}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComposeMessage)