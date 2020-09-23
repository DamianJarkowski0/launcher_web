import * as ACTIONS from './actions';
export const updateUser = (user) => ({
    type: ACTIONS.UPDATE_USER,
    user,
});
