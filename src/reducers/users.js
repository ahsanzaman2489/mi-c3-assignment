import {handleActions} from 'redux-actions'

let initialState = {
    isLoading:true
};

export default handleActions({
    'START_FETCHING_USERS'(state, action) {
        state={
            ...state,
            ...action.payload,
        }
        return state;
    },
    'FETCH_USERS'(state, action) {
        state={
            ...state,
            ...action.payload,
            isLoading:false,
        }
       
        return state;
    },
}, initialState);
