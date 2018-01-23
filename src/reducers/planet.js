import {handleActions} from 'redux-actions';

let initialState = {
    isLoading:true
};

export default handleActions({
    'START_FETCHING_PLANET'(state, action) {
        state={
            ...state,
            ...action.payload,
        }
        return state;
    },
    'FETCH_PLANET'(state, action) {
        state={
            ...state,
            ...action.payload,
            isLoading:false,
        }
       
        return state;
    },
}, initialState);
