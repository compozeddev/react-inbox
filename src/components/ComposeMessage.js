import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createMessage, setShouldShowComposeForm} from '../actions';

const ComposeMessage = ({shouldShowComposeForm, createMessage, setShouldShowComposeForm}) => {

    const onSubmit = (e) => {
        e.preventDefault();
        let newMessage = {
            subject: e.target.subject.value,
            body: e.target.body.value,
        };
        createMessage(newMessage);
        setShouldShowComposeForm(false);
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
                               name="subject" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea name="body" id="body" className="form-control" ></textarea>
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


const mapStateToProps = storeState => ({shouldShowComposeForm: storeState.views.shouldShowComposeForm});
const mapDispatchToProps = (dispatch) => bindActionCreators({createMessage, setShouldShowComposeForm}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComposeMessage)