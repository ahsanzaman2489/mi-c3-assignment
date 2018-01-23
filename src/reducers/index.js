import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';
import users from './users';
import planet from './planet';

export default combineReducers({routing, users,planet})
