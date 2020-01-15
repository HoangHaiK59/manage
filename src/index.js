import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { history } from './helper/history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import configStore from './store/configStore';
import * as serviceWorker from './serviceWorker';

import {loadState, saveState} from './persitor';

const persitedState = loadState();


// const middlewares = [];

// if(process.env.NODE_ENV === `development`) {
//     const {logger} = require('redux-logger');

//     middlewares.push(thunk,logger);
// }

// const store = createStore(rootReducer, applyMiddleware(...middlewares))

const store = configStore(persitedState);

store.subscribe(() => {
    saveState(store.getState())
})

// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <App />
//         </Router>
//     </Provider>, 
// document.getElementById('root'));
const renderApp = () =>
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,
        document.getElementById('root')
    )
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp)
}
renderApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
