import {combineReducers} from 'redux';

import reducer from './reducer';

const rootReducer = combineReducers(
    {
        facebook: reducer
    }
);
export default rootReducer;