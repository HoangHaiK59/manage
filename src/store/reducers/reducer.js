import { Constants } from "../define";

const initState = {
    isAuth: false,
    loginStatus: null,
    appInfo: null,
    creatives: [],
    error: null, 
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case Constants.SIGNIN_REQUEST:
            return { ...state, isAuth: false };
        case Constants.SIGNIN_SUCCESS:
            return {
                ...state,
                loginStatus: action.loginStatus,
                appInfo: action.appInfo,
                isAuth: true
            };
        case Constants.SIGNIN_ERROR:
            return {
                ...state,
                isAuth: false,
                error: action.error
            }
        case Constants.SIGNOUT:
            return {
                ...initState
            }
        case Constants.ADD_UNPUBLISH:
            return {
                ...state,
                creatives: state.creatives.concat(action.post)
            }
        case Constants.REMOVE_ONE_UNPUBLISH:
            return {
                ...state,
                creatives: state.creatives.filter(post => post.id !== action.id)
            }
        case Constants.CLEAR_UNPUBLISH:
            return {
                ...state,
                creatives: []
            }
        case Constants.ADD_UNPUBLISH_REQ: 
        return {
            ...state
        }
        case Constants.ADD_UNPUBLISH_SUCCESS: 
        return {
            ...state,
            creatives: state.creatives.concat(action.creatives)
        }
        case Constants.ADD_UNPUBLISH_ERROR: 
        return {
            ...state,
            error: action.error
        }
        default:
            return state;
    }
};

export default reducer;