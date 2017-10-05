import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import store from './store';
import {Provider} from 'react-redux';
import {fetchMessagesAction,} from './actions';
import {BrowserRouter} from 'react-router-dom';

store.dispatch(fetchMessagesAction());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
    
registerServiceWorker();
