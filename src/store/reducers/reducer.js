import { Constants } from "../define";

const initState = {
    isAuth: false,
    loginStatus: null,
    appInfo: null,
    unpublishes: [],
    schedules: [],
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
        case Constants.CLEAR_UNPUBLISH:
            return {
                ...state,
                unpublishes: []
            }
        case Constants.ADD_UNPUBLISH_REQ:
            return {
                ...state
            }
        case Constants.ADD_UNPUBLISH_SUCCESS:
            return {
                ...state
            }
        case Constants.ADD_UNPUBLISH_ERROR:
            return {
                ...state,
                error: action.error
            }
        case Constants.GET_UNPUBLISHES_REQ:
            return {
                ...state
            }
        case Constants.GET_UNPUBLISHES_SUCCESS:
            return {
                ...state,
                unpublishes: action.unpublishes
            }
        case Constants.GET_UNPUBLISHES_ERROR:
        case Constants.REMOVE_UNPUBLISH_ERROR:
        case Constants.DELETE_UNPUBLISHES_ERROR:
            return {
                ...state,
                error: action.error
            }
        case Constants.REMOVE_UNPUBLISH_REQ:
        case Constants.REMOVE_UNPUBLISH_SUCCESS:
        case Constants.DELETE_UNPUBLISHES_REQ:
        case Constants.DELETE_UNPUBLISHES_SUCCESS:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default reducer;