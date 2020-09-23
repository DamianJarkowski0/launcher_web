import User from '../models/User';
import * as ACTIONS from './actions';

const initialState = (new User());

export const userReducer = (state = initialState , action) => {
    switch (action.type) {
    case ACTIONS.UPDATE_USER:
        if (action.user !== undefined) {
            return Object.assign({}, action.user);
        }

        return Object.assign({}, new User());
    default:
        return state;
    }
};

