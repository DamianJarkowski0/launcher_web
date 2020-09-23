import {userReducer} from '../reducers/user.reducer';
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

const createReducer = (history) => {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer,
    });
};

export default createReducer;
