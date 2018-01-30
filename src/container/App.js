import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import TABLE from '../components/table';


import {Router, Route, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history'
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

import configureStore from '../store/configureStore';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const store = configureStore();
const history = syncHistoryWithStore(appHistory, store)



class App extends Component {
    render() {
        return (
            <div className="container">
                <Provider store={store}>
                    <Router history={history}>
                        <Route path="/users" component={TABLE}>
                        </Route>
                    </Router>
                </Provider>
            </div>
        );
    }

}

export default App;
