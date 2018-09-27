
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route } from 'react-router-dom';
import history from './history';
import { firebaseApp } from './firebase';
import store from './store';
import { Provider } from 'react-redux';
import { logUser } from './actions';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';



firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        const { email } = user;
        store.dispatch(logUser(email));
        history.push('./app');
    }
    else {
        history.replace('./signin');
    }

})

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={history} >
            <div>
                <Route path="/app" component={App} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
